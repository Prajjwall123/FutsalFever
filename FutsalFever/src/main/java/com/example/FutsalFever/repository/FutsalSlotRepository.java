package com.example.FutsalFever.repository;

import com.example.FutsalFever.entity.FutsalSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FutsalSlotRepository extends JpaRepository<FutsalSlot, Integer> {
}
