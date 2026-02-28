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

class FarmerProfile(models.BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='farmer_profile')
    region = models.CharField(max_length=100, db_index=True)
    trust_score = models.DecimalField(max_digits=5, decimal_places=2, default=50.00) # Increases/decreases based on quality [cite: 9]
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Farmer: {self.user.username} (Score: {self.trust_score})"