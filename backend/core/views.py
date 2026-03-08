from rest_framework.views import APIView
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from marketplace.models import SupplyRequest
from .models import User, FarmerProfile, BuyerProfile
from .serializers import UserSerializer, FarmerProfileSerializer, BuyerRegistrationSerializer
from .serializers import AdminAgentSerializer, AdminFarmerSerializer
from .serializers import AgentFarmerSerializer
class UserRegistrationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = BuyerRegistrationSerializer
    permission_classes = [AllowAny] 

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            "message": "Buyer account created successfully.",
            "user_id": user.id,
            "email": user.email
        }, status=status.HTTP_201_CREATED)

class FarmerProfileViewSet(viewsets.ModelViewSet):
    serializer_class = FarmerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['AGENT', 'ADMIN', 'SUPER_ADMIN']:
            return FarmerProfile.objects.all()
        return FarmerProfile.objects.filter(user=user)



class BuyerDashboardView(APIView):
    """
    Returns the dynamic dashboard data specifically for the logged-in buyer.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # 1. Security check: Ensure they are actually a BUYER
        if user.role != 'BUYER':
            return Response({"error": "Unauthorized view"}, status=403)
            
        # 2. Grab their specific profile from the database
        try:
            profile = BuyerProfile.objects.get(user=user)
        except BuyerProfile.DoesNotExist:
            return Response({"error": "Buyer profile missing"}, status=404)
# --- 2. DYNAMIC DATABASE QUERIES! ---
        # Count requests that haven't been accepted yet
        pending_count = SupplyRequest.objects.filter(
            buyer=user, 
            status__in=['PENDING_ADMIN', 'SOURCING']
        ).count()

        # Count active deliveries (money is locked or it is on the truck)
        active_count = SupplyRequest.objects.filter(
            buyer=user, 
            status__in=['ACCEPTED', 'PAYMENT_COMPLETE', 'IN_TRANSIT']
        ).count()

        # Count finished deliveries
        completed_count = SupplyRequest.objects.filter(
            buyer=user, 
            status='DELIVERED'
        ).count()
# --- NEW: Grab their 5 most recent orders! ---
        recent_reqs = SupplyRequest.objects.filter(buyer=user).order_by('-created_at')[:5]
        recent_requests_data = [{
            "id": str(req.id).split('-')[0].upper(), # Creates a clean short ID like "A8F9"
            "product_name": req.product.name,
            "quantity": req.quantity,
            "unit": req.product.unit_of_measure,
            "status_display": req.get_status_display(),
            "raw_status": req.status,
            "date": req.created_at.strftime("%b %d, %Y")
        } for req in recent_reqs]
        # 3. Return their actual data (We will replace the 0s with real database queries later once we build the SupplyRequest tables!)
        
        return Response({
            "full_name": f"{user.first_name} {user.last_name}".strip() or user.username,
            "email": user.email,
            "phone_number": user.phone_number,
            "company_name": profile.company_name,
            "business_type": profile.business_type,
            "delivery_address": profile.delivery_address,
            "is_verified": profile.is_verified,
            "stats": {
                "pending_requests": pending_count, 
                "active_deliveries": active_count,
                "completed_volume": f"{completed_count} Orders" 
            },
            "recent_requests": recent_requests_data # <-- Injected here!
        })




# --- ADMIN MANAGEMENT VIEWS ---
class AdminAgentViewSet(viewsets.ModelViewSet):
    serializer_class = AdminAgentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(role='AGENT').order_by('-date_joined')

    def check_permissions(self, request):
        super().check_permissions(request)
        if request.user.role not in ['ADMIN', 'SUPER_ADMIN']:
            self.permission_denied(request, message="Strictly Admins Only.")

class AdminFarmerViewSet(viewsets.ModelViewSet):
    serializer_class = AdminFarmerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FarmerProfile.objects.all().order_by('-created_at')

    def check_permissions(self, request):
        super().check_permissions(request)
        if request.user.role not in ['ADMIN', 'SUPER_ADMIN']:
            self.permission_denied(request, message="Strictly Admins Only.")


class AgentFarmerViewSet(viewsets.ModelViewSet):
    serializer_class = AgentFarmerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # The agent only sees farmers THEY registered
        return FarmerProfile.objects.filter(registered_by=self.request.user).order_by('-created_at')

    def check_permissions(self, request):
        super().check_permissions(request)
        if request.user.role != 'AGENT':
            self.permission_denied(request, message="Strictly Agents Only.")