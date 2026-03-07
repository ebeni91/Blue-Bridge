from django.contrib import admin
from .models import EscrowAccount

@admin.register(EscrowAccount)
class EscrowAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'amount', 'status', 'locked_at', 'released_at')
    list_filter = ('status',)
    search_fields = ('order__id',)