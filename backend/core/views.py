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