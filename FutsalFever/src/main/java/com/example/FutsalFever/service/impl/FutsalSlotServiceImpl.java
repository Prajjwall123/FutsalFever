package com.example.FutsalFever.service.impl;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.FutsalSlot;
import com.example.FutsalFever.pojo.FutsalSlotPojo;
import com.example.FutsalFever.repository.FutsalSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.FutsalFever.service.FutsalSlotService;
import com.example.FutsalFever.repository.FutsalRepository;

@Service
public class FutsalSlotServiceImpl implements FutsalSlotService {

    @Autowired
    private FutsalSlotRepository futsalSlotRepository;

    @Autowired
    private FutsalRepository FutsalRepository;

    @Override
    public List<FutsalSlot> getAllSlots() {
        return futsalSlotRepository.findAll();
    }

    @Override
    public FutsalSlot getSlotById(Integer id) {
        return futsalSlotRepository.findById(id).orElse(null);
    }

    @Override
    public FutsalSlot saveSlot(FutsalSlotPojo slotDTO) {
        FutsalSlot slot = new FutsalSlot();
        slot.setId(slotDTO.getId()); // Set the primary key
        slot.setStartTime(slotDTO.getStartTime());
        slot.setEndTime(slotDTO.getEndTime());
        slot.setBooked(slotDTO.isBooked());
        // Set the Futsal entity based on the provided Futsal ID
        Futsal futsal = FutsalRepository.findById(slotDTO.getFutsalId())
                .orElse(null);
        slot.setFutsal(futsal);
        return futsalSlotRepository.save(slot);
    }

    @Override
    public FutsalSlot updateSlot(Integer id, FutsalSlotPojo updatedSlotDTO) {
        FutsalSlot slot = futsalSlotRepository.findById(id).orElse(null);
        if (slot != null) {
            slot.setStartTime(updatedSlotDTO.getStartTime());
            slot.setEndTime(updatedSlotDTO.getEndTime());
            slot.setBooked(updatedSlotDTO.isBooked());
            // Set the Futsal entity based on the provided Futsal ID
            Futsal futsal = FutsalRepository.findById(updatedSlotDTO.getFutsalId())
                    .orElse(null);
            slot.setFutsal(futsal);
            return futsalSlotRepository.save(slot);
        }
        return null;
    }

    @Override
    public void deleteSlot(Integer id) {
        futsalSlotRepository.deleteById(id);
    }
}
