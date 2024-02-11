package com.example.FutsalFever.Controller;


import com.example.FutsalFever.entity.Booking;
import com.example.FutsalFever.pojo.BookingPojo;
import com.example.FutsalFever.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/request")
    public ResponseEntity<Booking> requestBooking(@RequestBody BookingPojo bookingPojo) {
        Booking requestedBooking = bookingService.requestBooking(bookingPojo);
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

    @PutMapping("/reject/{bookingId}")
    public ResponseEntity<Booking> rejectBooking(@PathVariable Integer bookingId) {
        Booking rejectedBooking = bookingService.rejectBooking(bookingId);
        return new ResponseEntity<>(rejectedBooking, HttpStatus.OK);
    }
}
