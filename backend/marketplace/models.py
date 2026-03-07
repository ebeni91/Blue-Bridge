import uuid
from django.db import models
from django.conf import settings

# 1. Product Categories (For grouping in the UI)
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

# 2. Platform-Managed Products (Blue Bridge lists these, not the farmers)
class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    
    name = models.CharField(max_length=200) # e.g., "Premium White Teff", "Export-Grade Sesame"
    description = models.TextField(help_text="Full necessary information about the product.")
    
    # Pricing & Metrics
    unit_of_measure = models.CharField(max_length=50, default="Tons")
    estimated_price_per_unit = models.DecimalField(max_digits=12, decimal_places=2, help_text="Estimated ETB per unit")
    minimum_order_quantity = models.PositiveIntegerField(default=1)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.category.name})"

# 3. The Buyer's Order (The "Request Process Engine" Flow)
class SupplyRequest(models.Model):
    # This matches your exact workflow!
    class RequestStatus(models.TextChoices):
        PENDING_ADMIN = 'PENDING_ADMIN', '1. Pending Admin Review'
        SOURCING = 'SOURCING', '2. Sourcing from Farmers (SMS Sent)'
        ACCEPTED = 'ACCEPTED', '3. Farmer Accepted - Awaiting Payment'
        PAYMENT_COMPLETE = 'PAYMENT_COMPLETE', '4. Escrow Funded'
        IN_TRANSIT = 'IN_TRANSIT', '5. In Transit'
        DELIVERED = 'DELIVERED', '6. Delivered'
        CANCELLED = 'CANCELLED', 'Cancelled'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # The Buyer making the request
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='supply_requests')
    
    # What they want
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    delivery_location = models.CharField(max_length=255)
    
    # The Workflow Status
    status = models.CharField(max_length=20, choices=RequestStatus.choices, default=RequestStatus.PENDING_ADMIN)
    
    # The Admin assigns this once a farmer agrees!
    assigned_farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='assigned_orders',
        help_text="The farmer who accepted the SMS/USSD request."
    )
    final_agreed_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # Creates a cool ID like "REQ-A8F9"
        short_id = str(self.id).split('-')[0].upper()
        return f"REQ-{short_id} - {self.product.name} ({self.get_status_display()})"