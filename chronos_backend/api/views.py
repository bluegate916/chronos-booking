from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Room, TimeSlot
from django.db import IntegrityError

from .serializers import (
    UserSerializer, 
    RoomSerializer, 
    TimeSlotSerializer, 
    UserRegistrationSerializer
)

#BookingSerializer Booking are all TimeSlotSerializer
# Create your views here.
class UserRegisterAPIView(APIView):
    """
    Features:
    - POST: Public endpoint allowing anyone to create an account.
    """
    permission_classes = [AllowAny] # Publicly accessible

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response({"error": "A database integrity conflict occurred."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract precise validation errors (like 'username already exists')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
#  this automatically handles database exceptions 
# (like your ExclusionConstraint double-booking error) 
# and returns clean error codes to React.
class TimeSlotCreateAPIView(APIView):
    """Handles fetching all bookings and creating a new booking."""
    def get(self, request):
        """Triggered when React sends a GET request to see all bookings."""
        # 1. Fetch all bookings from the database
        timeslot = TimeSlot.objects.all()
        # 2. Convert database instances into JSON format
        serializer = TimeSlotSerializer(timeslot, many=True)
        # 3. Return JSON back to the browser/React with a 200 OK status
        return Response(serializer.data)

    def post(self, request):
        """Triggered when React sends a POST request to book a room."""
        # 1. Feed the incoming JSON data from React into our Serializer
        serializer = TimeSlotSerializer(data=request.data)
        
        # 2. Check basic validations (e.g., if fields are missing or start > end)
        if serializer.is_valid():
            try:
                # 3. Try to save to PostgreSQL database
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            except IntegrityError:
                # 4. TRAP THE DOUBLE BOOKING: If PostgreSQL's ExclusionConstraint triggers,
                # Django throws an IntegrityError. We catch it here and inform React.
                return Response(
                    {"error": "This room is already booked for the selected time range."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # 5. Return field validation errors if the data format was wrong
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)