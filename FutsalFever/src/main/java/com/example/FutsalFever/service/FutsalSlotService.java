package com.example.FutsalFever.service;

import com.example.FutsalFever.entity.FutsalSlot;
import com.example.FutsalFever.pojo.FutsalSlotPojo;

import java.util.List;

public interface FutsalSlotService {
    List<FutsalSlot> getAllSlots();
    FutsalSlot getSlotById(Integer id);
    FutsalSlot saveSlot(FutsalSlotPojo slotDTO);
    FutsalSlot updateSlot(Integer id, FutsalSlotPojo updatedSlotDTO);
    void deleteSlot(Integer id);
}
