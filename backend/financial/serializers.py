from rest_framework import serializers
from .models import DeliveryJob, WarehouseReceipt

class DeliveryJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryJob
        fields = ['id', 'order', 'driver', 'status', 'tracking_number']
        read_only_fields = ['id', 'order', 'status', 'tracking_number']

class WarehouseReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseReceipt
        # Updated to use 'supply_request'
        fields = ['id', 'supply_request', 'grade', 'received_at'] 
        read_only_fields = ['id', 'received_at']