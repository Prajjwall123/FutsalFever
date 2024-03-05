package com.example.FutsalFever.Controller;


import com.example.FutsalFever.entity.Booking;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.BookingPojo;
import com.example.FutsalFever.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.FutsalFever.service.UserService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @PostMapping("/request")
    public ResponseEntity<Booking> requestBooking(@ModelAttribute BookingPojo bookingPojo, @RequestParam("file") MultipartFile image) {
        Booking requestedBooking = bookingService.requestBooking(bookingPojo, image);
        return new ResponseEntity<>(requestedBooking, HttpStatus.CREATED);
    }

    @GetMapping("/pending/{futsalId}")
    public ResponseEntity<List<Booking>> getPendingBookingsForFutsal(@PathVariable Integer futsalId) {
        List<Booking> pendingBookings = bookingService.getPendingBookingsForFutsal(futsalId);
        return new ResponseEntity<>(pendingBookings, HttpStatus.OK);
    }

    @PutMapping("/accept/{bookingId}")
    public ResponseEntity<Booking> acceptBooking(@PathVariable Integer bookingId) {
        Booking acceptedBooking = bookingService.acceptBooking(bookingId);
        return new ResponseEntity<>(acceptedBooking, HttpStatus.OK);
    }

    @DeleteMapping("/deleteById/{bookingId}")
    public String rejectBooking(@PathVariable Integer bookingId) {
        bookingService.rejectBooking(bookingId);

        return "deleted the booking";
    }

    @GetMapping("/verified")
    public ResponseEntity<List<Booking>> getVerifiedBookingsByUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName(); // Get the authenticated user's email
        // Fetch the User entity from the database based on the user email
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);
        int userId;

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userId = user.getId();
            System.out.println("user id:"+userId);
            List<Booking> verifiedBookings = bookingService.getVerifiedBookingsByUserId(userId);
            return new ResponseEntity<>(verifiedBookings, HttpStatus.OK);
        } else {
            // Handle the case where the user is not found
            System.out.println("user not found");
            return null;
        }

    }
}