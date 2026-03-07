from django.contrib import admin
from .models import DeliveryJob, WarehouseReceipt

@admin.register(DeliveryJob)
class DeliveryJobAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'driver', 'status', 'tracking_number')
    list_filter = ('status',)
    search_fields = ('tracking_number', 'order__id')

@admin.register(WarehouseReceipt)
class WarehouseReceiptAdmin(admin.ModelAdmin):
    # Changed from 'farmer_offer' to 'supply_request'
    list_display = ('id', 'supply_request', 'grade', 'received_at')
    list_filter = ('grade',)
    search_fields = ('supply_request__id',)