from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Room(models.Model):
    name = models.CharField(max_length=100, unique=True)
    ROOM_TYPES = [
        ( 'SINGLE', 'single room'),
        ( 'DOUBLE', 'Double room'),
        ( 'SUITE', 'suite'),
        ( 'CONF', 'conference room'),
    ]
    room_type = models.CharField( choices=ROOM_TYPES, default='SINGLE')
    room_number = models.CharField(max_length=20, unique=True)
    location = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True, max_length=1500)
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2, help_text="price per hour spent")
    image = models.ImageField(upload_to='rooms/', blank=True, null=True)

    def __str__(self):
        # __str__() is a default python method that return a string with
        # with the human_readable representation of the object
        return f"Room {self.room_number} ({self.room_type})"

class TimeSlot(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='slots')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    # Track state changes using these two fields
    is_booked = models.BooleanField(default=False)
    booked_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.room.name} ({self.start_time.strftime('%H:%M')} - {self.end_time.strftime('%H:%M')})"
