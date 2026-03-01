from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FarmerProfile, BuyerProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'phone_number', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'read_only': True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class FarmerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = FarmerProfile
        fields = ['id', 'user', 'region', 'trust_score', 'is_active']
        read_only_fields = ['trust_score', 'is_active']

class BuyerRegistrationSerializer(serializers.ModelSerializer):
    companyName = serializers.CharField(write_only=True)
    businessType = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    fullName = serializers.CharField(write_only=True)
    
    # Force email validation to prevent 500 crashes
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['email', 'phone_number', 'password', 'fullName', 'companyName', 'businessType', 'address']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if User.objects.filter(username=value).exists() or User.objects.filter(email=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value
        
    def validate_phone_number(self, value):
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("This phone number is already registered.")
        return value

    def create(self, validated_data):
        company_name = validated_data.pop('companyName')
        business_type = validated_data.pop('businessType')
        address = validated_data.pop('address')
        full_name = validated_data.pop('fullName')
        
        name_parts = full_name.split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        user = User.objects.create_user(
            username=validated_data['email'], 
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            first_name=first_name,
            last_name=last_name,
            role=User.Role.BUYER
        )

        BuyerProfile.objects.create(
            user=user,
            company_name=company_name,
            business_type=business_type,
            delivery_address=address
        )

        return user