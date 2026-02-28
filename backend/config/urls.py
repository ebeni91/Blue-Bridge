from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# --- CUSTOM JWT INJECTION ---
class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Inject our custom role into the security token!
        token['role'] = user.role 
        return token

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer
# ----------------------------

urlpatterns = [
    path('admin/', admin.site.urls),

    # --- Authentication Endpoints ---
    # Now uses our Custom view that includes the role
    path('api/auth/token/', CustomTokenView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # --- Domain App Endpoints ---
    path('api/core/', include('core.urls')),
    path('api/marketplace/', include('marketplace.urls')),
    path('api/logistics/', include('logistics.urls')),
]