from rest_framework import serializers
from .models import Category, Product, SupplyRequest

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'

class SupplyRequestSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = SupplyRequest
        fields = '__all__'
        # We make these read-only so buyers can't hack the API to change their own status or price!
        read_only_fields = ['buyer', 'status', 'assigned_farmer', 'final_agreed_price']