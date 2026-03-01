from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, FarmerProfile, BuyerProfile
from .serializers import UserSerializer, FarmerProfileSerializer, BuyerRegistrationSerializer

class UserRegistrationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Allows new buyers to sign up. 
    Notice we use AllowAny here because they don't have a token yet.
    """
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
    """
    Allows farmers to view/update their region and active status.
    Agents can view all farmers to manage them.
    """
    serializer_class = FarmerProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # If the user is an AGENT or ADMIN, let them see all farmers in their region
        if user.role in ['AGENT', 'ADMIN', 'SUPER_ADMIN']:
            return FarmerProfile.objects.all()
        # If the user is a FARMER, they strictly only see their own profile
        return FarmerProfile.objects.filter(user=user)