from rest_framework import serializers # type: ignore
from .models import Event, EventUser, ContactList

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only':True}}
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class EventUserSerializer(serializers.ModelSerializer):
       class Meta:
           model = EventUser
           fields = ('id', 'user_name', 'email')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'owner',
            'title',
            'description',
            'location',
            'address',
            'start_date',
            'end_date',
            'start_time',
            'end_time',
        )
        model = Event
        
class ContactListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'user',
            'contacts',
        )
        model = ContactList