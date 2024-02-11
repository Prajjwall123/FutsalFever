package com.example.FutsalFever.service;

import com.example.FutsalFever.entity.Booking;
import com.example.FutsalFever.pojo.BookingPojo;

import java.util.List;

public interface BookingService {
    List<Booking> getPendingBookingsForFutsal(Integer futsalId);
    Booking acceptBooking(Integer bookingId);
    Booking rejectBooking(Integer bookingId);
    Booking requestBooking(BookingPojo bookingPojo);
}
