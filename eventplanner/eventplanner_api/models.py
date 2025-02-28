from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from enum import Enum 

# User._meta.get_field('email')._unique = True
# User._meta.get_field('email').blank = False
# User._meta.get_field('email').null = False
class StateEnum(Enum):
    STATE_INVITED = "Invited"
    STATE_GOING = "Going"
    STATE_MAYBE = "Maybe"
    STATE_NOT_GOING = "Not Going"
    

class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, user_name, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        
        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True.')
        
        return self.create_user(email, user_name, password, **other_fields)
    
    def create_user(self, email, user_name, password, **other_fields):
        if not email: 
            raise ValueError(_('You must provide an emial address.'))
        
        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, **other_fields)
        
        user.set_password(password)
        user.save()
        
        return user


class EventUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True, blank=False, null=False)
    user_name = models.CharField(max_length=120, unique=False)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    objects = CustomAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name',]
    
    def __str__(self):
        return self.user_name
    
    
class ContactList(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
    contacts = models.ManyToManyField(EventUser, blank=True, related_name="contacts")
    
    def __str__(self):
        return self.user.user_name + " [Contacts]"
    
    def add_contact(self, account):
        if not account in self.contacts.all():
            self.contacts.add(account)
            self.save()
            
    def remove_contact(self, account):
        if account in self.contacts.all():
            self.contacts.remove(account)
            self.save()


class Event(models.Model):
    owner = models.ForeignKey(EventUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(default=None, null=True, blank=True)
    start_time = models.TimeField()
    end_time = models.TimeField(default=None, null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class EventInvite(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, default=1)
    email_address = models.EmailField(max_length=256)
    state = models.CharField(max_length=10, choices=[(s.value, s.name) for s in StateEnum], default=StateEnum.STATE_INVITED)
    
    def __str__(self):
        return self.event.title + ": " + self.email_address + "(" +  + ")"