from rest_framework import serializers
from .models import DeliveryJob, WarehouseReceipt

class DeliveryJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryJob
        fields = ['id', 'order', 'driver', 'status', 'tracking_number']
        # We make almost everything read-only so drivers can't alter the core delivery details.
        # They interact with it via the custom /accept_job/ endpoint we built.
        read_only_fields = ['id', 'order', 'status', 'tracking_number']

class WarehouseReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = WarehouseReceipt
        fields = ['id', 'farmer_offer', 'grade', 'received_at']
        read_only_fields = ['id', 'received_at']