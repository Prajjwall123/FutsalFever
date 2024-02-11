package com.example.FutsalFever.repository;

import com.example.FutsalFever.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.slot.futsal.id = :futsalId AND b.verified = false")

    List<Booking> findPendingBookingsByFutsalId(Integer futsalId);
}
