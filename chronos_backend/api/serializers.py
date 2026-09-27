from django.contrib.auth.models import User                  # Core Django User, can't import custom from it
from .models import Room, TimeSlot 
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    # The Meta class defines metadata for models
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Serializer for Rooms, Bookings
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "name"]

class TimeSlotSerializer(serializers.ModelSerializer):
    # We break the database DateTimeRangeField into start and end fields for React
    start_time = serializers.DateTimeField(write_only=True)
    end_time = serializers.DateTimeField(write_only=True)

    class Meta:
        model = TimeSlot
        # fields controls what JSON keys React can read or write to
        fields = ['id', 'room', 'start_time', 'end_time', 'time_slot']
        # time_slot is read_only because Django constructs it from start and end times
        read_only_fields = ['time_slot']

    def validate(self, data):
        """Ensures the start time is before the end time."""
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("End time must be after start time.")
        return data

    def create(self, validated_data):
        """Customizing how Django saves the model using the React time range."""
        from django.db.backends.postgresql.psycopg_any import DateTimeTZRange
        
        # Extract the times React sent us
        start = validated_data.pop('start_time')
        end = validated_data.pop('end_time')
        
        # Combine them into a PostgreSQL Range object that our model requires
        validated_data['time_slot'] = DateTimeTZRange(start, end)
        
        # Create and return the Booking instance in the database
        return super().create(validated_data)