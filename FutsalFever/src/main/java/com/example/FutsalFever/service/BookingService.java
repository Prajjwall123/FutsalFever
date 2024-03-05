package com.example.FutsalFever.service;

import com.example.FutsalFever.entity.Booking;
import com.example.FutsalFever.pojo.BookingPojo;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

public interface BookingService {
    List<Booking> getPendingBookingsForFutsal(Integer futsalId);
    Booking acceptBooking(Integer bookingId);
    void rejectBooking(Integer bookingId);
    Booking requestBooking(BookingPojo bookingPojo, MultipartFile imageFile);
    List<Booking> getVerifiedBookingsByUserId(Integer userId);
}
