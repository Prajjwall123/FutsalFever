package com.example.FutsalFever.repository;

import com.example.FutsalFever.entity.FutsalSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FutsalSlotRepository extends JpaRepository<FutsalSlot, Integer> {
    List<FutsalSlot> findAllByFutsalId(Integer futsalId);
    List<FutsalSlot> findByFutsalIdAndBooked(Integer futsalId, boolean booked);

}
