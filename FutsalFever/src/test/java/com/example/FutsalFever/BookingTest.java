package com.example.FutsalFever;

import com.example.FutsalFever.entity.Booking;
import com.example.FutsalFever.entity.FutsalSlot;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.BookingPojo;
import com.example.FutsalFever.repository.BookingRepository;
import com.example.FutsalFever.service.FutsalSlotService;
import com.example.FutsalFever.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;
import com.example.FutsalFever.service.impl.BookingServiceImpl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BookingServiceImplTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private UserService userService;

    @Mock
    private FutsalSlotService futsalSlotService;

    @InjectMocks
    private BookingServiceImpl bookingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getPendingBookingsForFutsal_ValidFutsalId_ReturnPendingBookings() {
        when(bookingRepository.findPendingBookingsByFutsalId(anyInt())).thenReturn(Collections.emptyList());

        List<Booking> pendingBookings = bookingService.getPendingBookingsForFutsal(1);

        assertNotNull(pendingBookings);
        assertEquals(0, pendingBookings.size());
    }



    @Test
    void rejectBooking_ValidBookingId_DeleteBooking() {
        Booking booking = new Booking();
        booking.setId(1);
        when(bookingRepository.findById(1)).thenReturn(Optional.of(booking));
        doNothing().when(bookingRepository).deleteById(1);

        bookingService.rejectBooking(1);

        verify(bookingRepository, times(1)).deleteById(1);
    }


}
