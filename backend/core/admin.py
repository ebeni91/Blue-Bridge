from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    User, FarmerProfile, BuyerProfile,
    AdminUser, AgentUser, DriverUser, BuyerUser, FarmerUser
)

# Base configuration for our custom users
class CustomUserAdmin(UserAdmin):
    # Customize the columns shown in the list view
    list_display = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'is_active')
    
    # Add our custom fields to the admin edit page so you can modify them
    fieldsets = UserAdmin.fieldsets + (
        ('Blue Bridge Details', {'fields': ('role', 'phone_number')}),
    )

# Register the Proxy Models
@admin.register(AdminUser)
class AdminUserAdmin(CustomUserAdmin):
    def save_model(self, request, obj, form, change):
        if not change: obj.role = 'ADMIN' # Auto-assign role if created via Admin
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

@admin.register(FarmerUser)
class FarmerUserAdmin(CustomUserAdmin):
    def save_model(self, request, obj, form, change):
        if not change: obj.role = 'FARMER'
        super().save_model(request, obj, form, change)

# Register the Profiles
@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'region', 'trust_score', 'is_active')
    search_fields = ('user__username', 'region')
    list_filter = ('is_active', 'region')

@admin.register(BuyerProfile)
class BuyerProfileAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'user', 'business_type', 'is_verified')
    search_fields = ('company_name', 'user__username')
    list_filter = ('is_verified', 'business_type')