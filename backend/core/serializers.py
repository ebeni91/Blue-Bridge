from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FarmerProfile, BuyerProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # We only expose safe fields. Never expose passwords or permissions here.
        fields = ['id', 'username', 'email', 'role', 'phone_number', 'password']
        extra_kwargs = {
            'password': {'write_only': True}, # Crucial: Password can be written, but never read/returned
            'role': {'read_only': True}       # Users cannot upgrade their own role via API
        }

    def create(self, validated_data):
        # We use create_user so the password gets securely hashed, not stored as plain text
        user = User.objects.create_user(**validated_data)
        return user

class FarmerProfileSerializer(serializers.ModelSerializer):
    # We nest the user data so the frontend gets the username/email along with the profile
    user = UserSerializer(read_only=True)

    class Meta:
        model = FarmerProfile
        fields = ['id', 'user', 'region', 'trust_score', 'is_active']
        # Trust score is controlled by the system (Quality Grading), NOT the user
        read_only_fields = ['trust_score', 'is_active']


class BuyerRegistrationSerializer(serializers.ModelSerializer):
    # Virtual fields that map to the BuyerProfile
    companyName = serializers.CharField(write_only=True)
    businessType = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    fullName = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'phone_number', 'password', 'fullName', 'companyName', 'businessType', 'address']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # 1. Extract Profile Data
        company_name = validated_data.pop('companyName')
        business_type = validated_data.pop('businessType')
        address = validated_data.pop('address')
        full_name = validated_data.pop('fullName')
        
        # Split full name into first and last for Django's standard User model
        name_parts = full_name.split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        # 2. Create the core User
        # We use email as the username since it's a B2B platform
        user = User.objects.create_user(
            username=validated_data['email'], 
            email=validated_data['email'],
            password=validated_data['password'],
            phone_number=validated_data.get('phone_number', ''),
            first_name=first_name,
            last_name=last_name,
            role=User.Role.BUYER
        )

        # 3. Create the attached Buyer Profile
        BuyerProfile.objects.create(
            user=user,
            company_name=company_name,
            business_type=business_type,
            delivery_address=address
        )

        return user