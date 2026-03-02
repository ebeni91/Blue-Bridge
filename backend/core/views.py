from rest_framework.views import APIView
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, FarmerProfile, BuyerProfile
from .serializers import UserSerializer, FarmerProfileSerializer, BuyerRegistrationSerializer

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

        # 3. Return their actual data (We will replace the 0s with real database queries later once we build the SupplyRequest tables!)
        return Response({
            "full_name": f"{user.first_name} {user.last_name}",
            "company_name": profile.company_name,
            "business_type": profile.business_type,
            "stats": {
                "pending_requests": 0, 
                "active_deliveries": 0,
                "completed_volume": "0T"
            },
            "recent_requests": [] 
        })