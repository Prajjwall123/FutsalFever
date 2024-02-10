package com.example.FutsalFever.service;

import com.example.FutsalFever.entity.FutsalSlot;
import com.example.FutsalFever.pojo.FutsalSlotPojo;

import java.util.List;
import java.util.Optional;

public interface FutsalSlotService {
    List<FutsalSlot> getAllSlots();
    List<FutsalSlot> getAllSlotsForFutsal(Integer futsalId);
    FutsalSlot getSlotById(Integer id);
    FutsalSlot saveSlot(FutsalSlotPojo slotDTO);
    FutsalSlot updateSlot(Integer id, FutsalSlotPojo updatedSlotDTO);
    void deleteSlot(Integer id);
}
