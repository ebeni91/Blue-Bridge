import uuid
from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, FarmerProfile, BuyerProfile,
    AdminUser, AgentUser, DriverUser, BuyerUser, FarmerUser
)

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'is_active')
    fieldsets = UserAdmin.fieldsets + (
        ('Blue Bridge Details', {'fields': ('role', 'phone_number')}),
    )

@admin.register(User)
class MasterUserAdmin(CustomUserAdmin):
    pass

@admin.register(AdminUser)
class AdminUserAdmin(CustomUserAdmin):
    def save_model(self, request, obj, form, change):
        if not change: obj.role = 'ADMIN' 
        super().save_model(request, obj, form, change)

@admin.register(AgentUser)
class AgentUserAdmin(CustomUserAdmin):
    def save_model(self, request, obj, form, change):
        if not change: obj.role = 'AGENT'
        super().save_model(request, obj, form, change)

@admin.register(DriverUser)
class DriverUserAdmin(CustomUserAdmin):
    def save_model(self, request, obj, form, change):
        if not change: obj.role = 'DRIVER'
        super().save_model(request, obj, form, change)

@admin.register(BuyerUser)
class BuyerUserAdmin(CustomUserAdmin):
    def save_model(self, request, obj, form, change):
        if not change: obj.role = 'BUYER'
        super().save_model(request, obj, form, change)

# ==========================================
# CUSTOM FARMER ADMIN 
# ==========================================

class FarmerProfileInline(admin.StackedInline):
    model = FarmerProfile
    fk_name = 'user'
    can_delete = False
    verbose_name_plural = 'Farm & Harvest Details'
    fields = ('farmer_id', 'region', 'address', 'primary_product', 'secondary_product', 'harvest_season', 'trust_score')
    readonly_fields = ('trust_score', 'farmer_id')

class FarmerUserForm(forms.ModelForm):
    phone_number = forms.CharField(required=True, help_text="Used for SMS and Login.")
    first_name = forms.CharField(required=True, label="First Name")
    
    class Meta:
        model = FarmerUser
        fields = ('first_name', 'last_name', 'phone_number', 'is_active')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.role = 'FARMER' # STRICTLY ENFORCE ROLE HERE
        if not user.pk:  
            user.username = f"FARM-{uuid.uuid4().hex[:6].upper()}" # Use ID as username
            user.set_password(uuid.uuid4().hex) 
        if commit:
            user.save()
        return user

@admin.register(FarmerUser)
class FarmerUserAdmin(admin.ModelAdmin): 
    form = FarmerUserForm
    inlines = [FarmerProfileInline]
    list_display = ('phone_number', 'first_name', 'last_name', 'is_active')
    search_fields = ('phone_number', 'first_name', 'last_name')
    
    fieldsets = (
        ('Farmer Identity', {
            'fields': ('first_name', 'last_name', 'phone_number', 'is_active'),
            'description': "Farmers do not use passwords. They log in via Phone Number/SMS."
        }),
    )

# ==========================================
# REMAINING PROFILES
# ==========================================

@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'region', 'primary_product', 'trust_score', 'is_active')
    search_fields = ('user__username', 'region', 'primary_product')
    list_filter = ('is_active', 'region')

@admin.register(BuyerProfile)
class BuyerProfileAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'user', 'business_type', 'is_verified')
    search_fields = ('company_name', 'user__username')
    list_filter = ('is_verified', 'business_type')