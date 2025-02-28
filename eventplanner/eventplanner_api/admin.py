from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

from .models import Event, EventInvite, EventUser

class UserAdminConfig(UserAdmin):
    model = EventUser
    search_fields = ('email', 'user_name')
    list_filter = ('email', 'user_name', 'is_active', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'user_name', 'is_active', 'is_staff')
    fieldsets =(
        (None, {'fields': ('email', 'user_name'),}),
        ('Permissions', {'fields': ('is_active', 'is_staff'),}),
    )
    
    formfield_overrides={
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    
    add_fieldsets =(
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'password1', 'password2', 'is_active', 'is_staff')
        })
    )

# Register your models here.
# admin.site.register(EventUser, EventUserAdmin)
admin.site.register(Event)
admin.site.register(EventUser, UserAdminConfig)
admin.site.register(EventInvite)

#SuperUser Password
#Freezing!C4tsLoveCream