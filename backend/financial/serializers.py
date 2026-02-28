from rest_framework import serializers
from .models import EscrowAccount

class EscrowAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = EscrowAccount
        fields = ['id', 'order', 'amount', 'status', 'locked_at', 'released_at']
        # Make absolutely everything read-only for standard API views.
        # Escrow updates should only happen via secure backend service functions.
        read_only_fields = ['id', 'order', 'amount', 'status', 'locked_at', 'released_at']