import uuid
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        SUPER_ADMIN = 'SUPER_ADMIN', 'Super Admin'
        ADMIN = 'ADMIN', 'Admin'
        AGENT = 'AGENT', 'Agent'
        FARMER = 'FARMER', 'Farmer'
        DRIVER = 'DRIVER', 'Driver'
        BUYER = 'BUYER', 'Buyer'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.BUYER)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    
    groups = models.ManyToManyField('auth.Group', related_name='bluebridge_users', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='bluebridge_users', blank=True)

    def __str__(self):
        return f"{self.username} - {self.role}"

class FarmerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='farmer_profile')
    region = models.CharField(max_length=100)
    primary_product = models.CharField(max_length=100, default="Unknown")
    harvest_season = models.CharField(max_length=100, default="Meher")
    trust_score = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Farmer {self.user.username} - {self.region}"

class BuyerProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='buyer_profile')
    
    company_name = models.CharField(max_length=255)
    business_type = models.CharField(max_length=100)
    delivery_address = models.TextField()
    
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Buyer: {self.company_name} ({self.user.username})"
    




# ==========================================
# CUSTOM MANAGERS FOR ADMIN SEPARATION
# ==========================================
class AdminManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role__in=['SUPER_ADMIN', 'ADMIN'])

class AgentManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role='AGENT')

class DriverManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role='DRIVER')

class BuyerManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role='BUYER')

class FarmerManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role='FARMER')

# ==========================================
# PROXY MODELS (Virtual Admin Tables)
# ==========================================
class AdminUser(User):
    objects = AdminManager()
    class Meta:
        proxy = True
        verbose_name = 'Admin'
        verbose_name_plural = '1. Admins' # Numbers used to force ordering in the Admin Sidebar

class AgentUser(User):
    objects = AgentManager()
    class Meta:
        proxy = True
        verbose_name = 'Agent'
        verbose_name_plural = '2. Agents'

class DriverUser(User):
    objects = DriverManager()
    class Meta:
        proxy = True
        verbose_name = 'Driver'
        verbose_name_plural = '3. Drivers'

class BuyerUser(User):
    objects = BuyerManager()
    class Meta:
        proxy = True
        verbose_name = 'Buyer'
        verbose_name_plural = '4. Buyers'

class FarmerUser(User):
    objects = FarmerManager()
    class Meta:
        proxy = True
        verbose_name = 'Farmer'
        verbose_name_plural = '5. Farmers'