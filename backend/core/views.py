from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User, FarmerProfile
from .serializers import UserSerializer, FarmerProfileSerializer

class UserRegistrationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Allows new buyers to sign up. 
    Notice we use AllowAny here because they don't have a token yet.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] 

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