from rest_framework import serializers
from .models import ProductCategory, ActiveHarvest, OrderRequest

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'base_price_per_kg']

class ActiveHarvestSerializer(serializers.ModelSerializer):
    # This prevents farmers from faking which category they are supplying
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = ActiveHarvest
        fields = ['id', 'category', 'category_name', 'available_weight_kg', 'region']

class OrderRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderRequest
        fields = ['id', 'buyer', 'category', 'requested_weight_kg', 'target_region', 'status', 'total_price', 'created_at']
        # The buyer should not be able to set their own status or total price
        read_only_fields = ['buyer', 'status', 'total_price', 'created_at']

    def validate_requested_weight_kg(self, value):
        """
        Custom Validation: Enforces the fixed weight clustering rule.
        Buyers can only request multiples of 25kg.
        """
        allowed_weights = [25, 50, 75, 100, 200, 500]
        if value not in allowed_weights:
            raise serializers.ValidationError(f"Invalid weight. Must be one of: {allowed_weights}kg.")
        return value