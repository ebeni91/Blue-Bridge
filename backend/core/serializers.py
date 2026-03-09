from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FarmerProfile, BuyerProfile
import uuid
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



# --- ADMIN MANAGEMENT SERIALIZERS ---
class AdminAgentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number', 'password', 'is_active']

    def create(self, validated_data):
        password = validated_data.pop('password', 'changeme123')
        user = User.objects.create_user(**validated_data, role=User.Role.AGENT, password=password)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


 
class AdminFarmerSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    input_full_name = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(source='user.phone_number')
    is_active = serializers.BooleanField(source='user.is_active', required=False)
    
    class Meta:
        model = FarmerProfile
        fields = ['id', 'farmer_id', 'full_name', 'input_full_name', 'phone_number', 'region', 'address', 'primary_product', 'secondary_product', 'harvest_season', 'trust_score', 'is_active']
        read_only_fields = ['trust_score', 'farmer_id']

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.phone_number

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        full_name = validated_data.pop('input_full_name')
        phone_number = user_data.get('phone_number')
        
        name_parts = full_name.split(' ', 1)
        
        # Generate the unique ID to serve as their permanent system username
        new_farmer_id = f"FARM-{uuid.uuid4().hex[:6].upper()}"

        user = User.objects.create_user(
            username=new_farmer_id, 
            phone_number=phone_number,
            first_name=name_parts[0],
            last_name=name_parts[1] if len(name_parts) > 1 else '',
            password=uuid.uuid4().hex, # Unusable random password
            role=User.Role.FARMER,     # STRICTLY ENFORCE ROLE
            is_active=user_data.get('is_active', True)
        )
        
        profile = FarmerProfile.objects.create(user=user, farmer_id=new_farmer_id, **validated_data)
        return profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        full_name = validated_data.pop('input_full_name', None)
        user = instance.user

        if full_name:
            name_parts = full_name.split(' ', 1)
            user.first_name = name_parts[0]
            user.last_name = name_parts[1] if len(name_parts) > 1 else ''
        
        if 'phone_number' in user_data: 
            user.phone_number = user_data['phone_number']
            user.username = user_data['phone_number'] # Keep username synced with phone
        if 'is_active' in user_data: user.is_active = user_data['is_active']
        user.save()

        if 'region' in validated_data: instance.region = validated_data['region']
        if 'primary_product' in validated_data: instance.primary_product = validated_data['primary_product']
        if 'secondary_product' in validated_data: instance.secondary_product = validated_data['secondary_product']
        instance.save()
        
        return instance


class AgentFarmerSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    input_full_name = serializers.CharField(write_only=True)
    phone_number = serializers.CharField(source='user.phone_number')
    
    class Meta:
        model = FarmerProfile
        fields = ['id', 'full_name', 'input_full_name', 'phone_number', 'region', 'primary_product', 'additional_products', 'trust_score']
        read_only_fields = ['trust_score']

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.phone_number

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        full_name = validated_data.pop('input_full_name')
        phone_number = user_data.get('phone_number')
        
        name_parts = full_name.split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        user = User.objects.create_user(
            username=phone_number,
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            password=uuid.uuid4().hex, 
            role=User.Role.FARMER,
            is_active=True
        )
        
        # Automatically tie the farmer to the agent making the request!
        agent = self.context['request'].user
        profile = FarmerProfile.objects.create(user=user, registered_by=agent, **validated_data)
        return profile