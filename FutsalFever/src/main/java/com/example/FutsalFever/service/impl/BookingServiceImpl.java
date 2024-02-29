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
import org.springframework.security.core.Authentication;

import com.example.FutsalFever.util.ImageToBase64;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

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

    private final String UPLOAD_DIRECTORY = new StringBuilder()
            .append(System.getProperty("user.dir"))
            .append("/futsalFeverApp/Images")
            .toString();

    ImageToBase64 imageToBase64 = new ImageToBase64();

    @Override
    public List<Booking> getPendingBookingsForFutsal(Integer futsalId) {
        // Retrieve pending bookings for the specified futsalId
        List<Booking> pendingBookings = bookingRepository.findPendingBookingsByFutsalId(futsalId);

        // Iterate through each booking to update the payment image to base64 representation
        for (Booking booking : pendingBookings) {
            String imagePath = "/Images/" + booking.getPaymentImage(); // Assuming the paymentImage field holds the image file name
            String base64Image = imageToBase64.getImageBase64(imagePath);
            booking.setPaymentImage(base64Image);
        }

        return pendingBookings;
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
    public Booking requestBooking(BookingPojo bookingPojo, MultipartFile imageFile) {
        // Implement logic to create a new booking request based on the provided data
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Fetch the FutsalSlot entity based on the provided slot ID
            FutsalSlot futsalSlotOfHere = futsalSlotService.getSlotById(bookingPojo.getSlotId());

            // Save the payment image from the multipart file
            String paymentImageFilename = saveImage(imageFile);

            Booking booking = new Booking();
            booking.setSlot(futsalSlotOfHere);
            booking.setUser(user);
            booking.setPaymentImage(paymentImageFilename); // Set the filename of the saved payment image
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


    private String saveImage(MultipartFile imageFile) {
        try {
            String filename = imageFile.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIRECTORY, filename);
            Files.write(path, imageFile.getBytes());
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage());
        }
    }



}
