from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Room(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        # __str__() is a default python method that return a string with
        # with the human_readable representation of the object 
        return self.name

class TimeSlot(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='slots')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    
    # Track state changes using these two fields
    is_booked = models.BooleanField(default=False)
    booked_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.room.name} ({self.start_time.strftime('%H:%M')} - {self.end_time.strftime('%H:%M')})"
