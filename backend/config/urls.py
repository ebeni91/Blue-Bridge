from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Super Admin strictly uses the built-in Django admin panel
    path('admin/', admin.site.urls),

    # --- Authentication Endpoints ---
    # The frontend sends phone/password here, and gets back the JWT 'wristband'
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # When the 15-minute token expires, the frontend silently calls this to get a new one
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # --- Domain App Endpoints ---
    path('api/core/', include('core.urls')),
    path('api/marketplace/', include('marketplace.urls')),
    path('api/logistics/', include('logistics.urls')),
    
    # Financial app endpoints are mostly internal services, but you might add 
    # read-only payment history routes here later.
]