package com.example.FutsalFever.service.impl;

import com.example.FutsalFever.entity.Booking;
import com.example.FutsalFever.entity.FutsalSlot;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.BookingPojo;
import com.example.FutsalFever.repository.BookingRepository;
import com.example.FutsalFever.service.BookingService;
import com.example.FutsalFever.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.FutsalFever.service.FutsalSlotService;
import com.example.FutsalFever.repository.UserRepository;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FutsalSlotService futsalSlotService;

    @Override
    public List<Booking> getPendingBookingsForFutsal(Integer futsalId) {
        // Implement logic to retrieve pending bookings for the specified futsalId
        return bookingRepository.findPendingBookingsByFutsalId(futsalId);
    }

    @Override
    public Booking acceptBooking(Integer bookingId) {
        // Implement logic to accept the booking with the given bookingId
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setVerified(true);
            booking.getSlot().setBooked(true);
            return bookingRepository.save(booking);
        }
        return null; // Handle if booking is not found
    }

    @Override
    public void rejectBooking(Integer bookingId) {
        // Implement logic to reject the booking with the given bookingId
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null) {
            // Additional logic if needed
            bookingRepository.deleteById(booking.getId());
        }
    }

    @Override
    public Booking requestBooking(BookingPojo bookingPojo) {
        // Implement logic to create a new booking request based on the provided data
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Fetch the FutsalSlot entity based on the provided slot ID
            FutsalSlot futsalSlotOfHere = futsalSlotService.getSlotById(bookingPojo.getSlotId());
            Booking booking = new Booking();
            booking.setSlot(futsalSlotOfHere);
            booking.setUser(user);
            booking.setPaymentImage(bookingPojo.getPaymentImage());
            booking.setUsername(bookingPojo.getUsername());
            booking.setVerified(false);

            // Save the booking to the database
            Booking savedBooking = bookingRepository.save(booking);

            // Return the saved booking entity
            return savedBooking;

        } else {
            throw new RuntimeException("User not found with email: " + currentUserEmail);
        }
    }


}
