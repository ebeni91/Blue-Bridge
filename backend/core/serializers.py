from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import FarmerProfile

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