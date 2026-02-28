from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):
    """Only allows the system owners (Super Admins)."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'SUPER_ADMIN')

class IsNormalAdmin(permissions.BasePermission):
    """Allows Super Admins AND Normal Admins."""
    def has_permission(self, request, view):
        allowed_roles = ['SUPER_ADMIN', 'ADMIN']
        return bool(request.user and request.user.is_authenticated and request.user.role in allowed_roles)

class IsAgent(permissions.BasePermission):
    """Only allows field agents who register farmers."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'AGENT')

class IsFarmer(permissions.BasePermission):
    """Only allows verified farmers."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'FARMER')

class IsDriver(permissions.BasePermission):
    """Only allows delivery drivers."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'DRIVER')

class IsBuyerOrReadOnly(permissions.BasePermission):
    """
    Custom rule: Anyone can view (GET) products without logging in, 
    but only authenticated Buyers can create orders (POST).
    """
    def has_permission(self, request, view):
        # Allow viewing (GET, HEAD, OPTIONS) for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # For ordering (POST), must be an authenticated buyer
        return bool(request.user and request.user.is_authenticated and request.user.role == 'BUYER')