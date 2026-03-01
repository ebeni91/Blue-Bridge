import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Centralized Custom User Model.
    Replaces Django's default user to use UUIDs and enforce roles.
    """
    class Role(models.TextChoices):
        SUPER_ADMIN = 'SUPER_ADMIN', 'Super Admin'
        ADMIN = 'ADMIN', 'Admin'
        AGENT = 'AGENT', 'Agent'
        FARMER = 'FARMER', 'Farmer'
        DRIVER = 'DRIVER', 'Driver'
        BUYER = 'BUYER', 'Buyer'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.BUYER)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True) # Used for OTP checkout [cite: 14]
    
    # Required to prevent clash with Django's default auth system
    groups = models.ManyToManyField('auth.Group', related_name='bluebridge_users', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='bluebridge_users', blank=True)

    def __str__(self):
        return f"{self.username} - {self.role}"

class FarmerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='farmer_profile')
    region = models.CharField(max_length=100)
    
    # NEW FIELDS ADDED FOR AGENT ONBOARDING
    primary_product = models.CharField(max_length=100, default="Unknown", help_text="e.g. White Teff, Wheat")
    harvest_season = models.CharField(max_length=100, default="Meher", help_text="e.g. Meher, Belg, Irrigation")
    
    trust_score = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Farmer {self.user.username} - {self.region}"


class BuyerProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='buyer_profile')
    
    # New B2B Fields from your frontend form
    company_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100)
    delivery_address = models.TextField()
    
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Buyer: {self.company_name} ({self.user.username})"