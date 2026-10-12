from django.urls import path
from .views import (
    UserRegisterAPIView, 
    CustomTokenObtainPairView,
    UserProfileAPIView,
    # RoomListCreateAPIView,
    # RoomDetailAPIView,
    # AvailableTimeSlotListView,
    # BookTimeSlotView,
    # UserBookingsListView,
    # CancelBookingView
)

urlpatterns = [
    # ... your existing endpoints stay here ...
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', UserRegisterAPIView.as_view(), name='api-register'),

    # users profile endpouint
    path('user/profile/', UserProfileAPIView.as_view(), name='user-profile'),

    # Rooms
    # path('rooms/', RoomListCreateAPIView.as_view(), name='room-list-create'),
    # path('rooms/<int:pk>/', RoomDetailAPIView.as_view(), name='room-detail'),
        
    # Bookings & Slots
    # path('rooms/<int:room_id>/slots/', AvailableTimeSlotListView.as_view(), name='available-slots'),
    # path('slots/<int:pk>/book/', BookTimeSlotView.as_view(), name='book-slot'),
    # path('slots/<int:pk>/cancel/', CancelBookingView.as_view(), name='cancel-booking'),
    # path('my-bookings/', UserBookingsListView.as_view(), name='user-bookings'),
]
