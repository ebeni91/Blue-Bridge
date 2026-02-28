from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, FarmerProfile

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # What columns to show in the user list
    list_display = ('username', 'email', 'role', 'phone_number', 'is_staff')
    # Add filters to the right sidebar
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    
    # Add our custom fields to the edit screen
    fieldsets = UserAdmin.fieldsets + (
        ('Platform Details', {'fields': ('role', 'phone_number')}),
    )
    # Add our custom fields to the creation screen
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Platform Details', {'fields': ('role', 'phone_number')}),
    )

@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'region', 'trust_score', 'is_active')
    list_filter = ('region', 'is_active')