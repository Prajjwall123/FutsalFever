package com.example.FutsalFever.Controller;

import com.example.FutsalFever.entity.FutsalSlot;
import com.example.FutsalFever.pojo.FutsalSlotPojo;
import com.example.FutsalFever.service.FutsalSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/futsal-slots")
public class FutsalSlotController {

    @Autowired
    private FutsalSlotService futsalSlotService;

    // Endpoint to get all FutsalSlots
    @GetMapping("/getAll")
    public List<FutsalSlot> getAllFutsalSlots() {
        return futsalSlotService.getAllSlots();
    }

    // Endpoint to get a FutsalSlot by ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<FutsalSlot> getFutsalSlotById(@PathVariable Integer id) {
        FutsalSlot futsalSlot = futsalSlotService.getSlotById(id);
        if (futsalSlot != null) {
            return new ResponseEntity<>(futsalSlot, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to create a new FutsalSlot
    @PostMapping("/save")
    public ResponseEntity<FutsalSlot> createFutsalSlot(@RequestBody FutsalSlotPojo futsalSlotPojo) {
        FutsalSlot newFutsalSlot = futsalSlotService.saveSlot(futsalSlotPojo);
        return new ResponseEntity<>(newFutsalSlot, HttpStatus.CREATED);
    }

    // Endpoint to update an existing FutsalSlot
    @PutMapping("/update/{id}")
    public ResponseEntity<FutsalSlot> updateFutsalSlot(@PathVariable Integer id, @RequestBody FutsalSlotPojo updatedFutsalSlotPojo) {
        FutsalSlot updatedFutsalSlot = futsalSlotService.updateSlot(id, updatedFutsalSlotPojo);
        if (updatedFutsalSlot != null) {
            return new ResponseEntity<>(updatedFutsalSlot, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to delete a FutsalSlot by ID
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<Void> deleteFutsalSlot(@PathVariable Integer id) {
        futsalSlotService.deleteSlot(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/futsals/{futsalId}")
    public ResponseEntity<List<FutsalSlot>> getAllFutsalSlotsForFutsal(@PathVariable Integer futsalId) {
        List<FutsalSlot> futsalSlots = futsalSlotService.getAllSlotsForFutsal(futsalId);
        if (!futsalSlots.isEmpty()) {
            return new ResponseEntity<>(futsalSlots, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/futsals/{futsalId}/pending-slots")
    public ResponseEntity<List<FutsalSlot>> getPendingFutsalSlotsForFutsal(@PathVariable Integer futsalId) {
        List<FutsalSlot> pendingSlots = futsalSlotService.getPendingSlotsForFutsal(futsalId);
        if (!pendingSlots.isEmpty()) {
            return new ResponseEntity<>(pendingSlots, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
