# We will use 'djangorestframework-simplejwt' for this.
# You would add it to requirements/base.txt

REST_FRAMEWORK = {
    # 1. AUTHENTICATION: How do we know who the user is?
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    
    # 2. PERMISSIONS: What are they allowed to do?
    # SECURE BY DEFAULT: If a developer forgets to add permissions to a view, 
    # DRF will block access instead of accidentally leaving it public.
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

from datetime import timedelta

# JWT Configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15), # Short lifespan for security
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),    # Longer lifespan so users don't constantly log in
    'ROTATE_REFRESH_TOKENS': True,                  # Generates a new refresh token on use
    'BLACKLIST_AFTER_ROTATION': True,               # Prevents stolen tokens from being reused
    'AUTH_HEADER_TYPES': ('Bearer',),               # Frontend will send: "Authorization: Bearer <token>"
}