from django.contrib import admin
from .models import Category, Product, SupplyRequest

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'estimated_price_per_unit', 'minimum_order_quantity', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'description')

@admin.register(SupplyRequest)
class SupplyRequestAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'buyer', 'quantity', 'status', 'assigned_farmer', 'created_at')
    list_filter = ('status', 'product__category', 'created_at')
    search_fields = ('id', 'buyer__username', 'product__name')
    
    # Make it easy for the admin to use the Process Engine
    fieldsets = (
        ('Buyer Request Details', {
            'fields': ('buyer', 'product', 'quantity', 'delivery_location', 'created_at')
        }),
        ('Request Process Engine (Admin Use Only)', {
            'fields': ('status', 'assigned_farmer', 'final_agreed_price'),
            'description': "Update the status here. Once a farmer accepts the SMS alert, assign them here and change status to 'Farmer Accepted - Awaiting Payment'."
        }),
    )
    readonly_fields = ('created_at',)