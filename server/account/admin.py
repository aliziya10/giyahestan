from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Account
from django.contrib.auth.models import User

class AccountAdmin(admin.ModelAdmin):
    list_display = ("id",'email','password','date_joined','is_staff')


admin.site.register(Account,AccountAdmin)

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'id')
    readonly_fields = ('id',)


admin.site.unregister(User)

admin.site.register(User, CustomUserAdmin)