package com.example.FutsalFever.Controller;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.service.FutsalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.FutsalFever.service.UserService;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/futsals")
public class FutsalController {

    @Autowired
    private FutsalService futsalService;

    @Autowired
    private UserService userService;

    @GetMapping("/getAll")
    public List<Futsal> getAllFutsals() {
        return futsalService.getAllFutsals();
    }

    @GetMapping("/getById/{id}")
    public Futsal getFutsalById(@PathVariable Integer id) {
        return futsalService.getFutsalById(id);
    }

    @GetMapping("/getByName/{name}")
    public Futsal getFutsalByName(@PathVariable String name) {
        return futsalService.getFutsalByName(name);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveFutsal(@ModelAttribute Futsal futsal, @RequestParam("file") MultipartFile image) {
        // Fetch the authenticated user details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName(); // Get the authenticated user's email

        // Fetch the User entity from the database based on the user email
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get(); // Extract the User object from the Optional
            // Set the User entity to the user field of the Futsal entity
            futsal.setUser(user);

            // Save the Futsal entity with the image file
            futsalService.saveFutsal(futsal, image);

            return ResponseEntity.status(HttpStatus.CREATED).body("Futsal saved successfully.");
        } else {
            // Handle the case where the user is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with email: " + currentUserEmail);
        }
    }




    @PutMapping("/updateByOwnerId/{ownerEmail}")
    public Futsal updateFutsalByOwnerId(@ModelAttribute Futsal updatedFutsal, @RequestParam("file") MultipartFile image, @PathVariable String ownerEmail) {
        // Fetch the owner ID using the owner's email
        Optional<User> ownerOptional = userService.getByEmail(ownerEmail);
        if (ownerOptional.isPresent()) {
            User owner = ownerOptional.get();
            int ownername= owner.getId();
            System.out.println(ownername);
            // Update the futsal using the owner's ID
            return futsalService.updateFutsal(ownername, updatedFutsal, image);
        } else {
            throw new RuntimeException("Owner not found with email: " + ownerEmail);
        }
    }



    @GetMapping("/getByOwnerEmail/{ownerEmail}")
    public Futsal getFutsalByOwnerId(@PathVariable String ownerEmail) {
        // Fetch futsal by owner ID using the FutsalService
        Optional<User> ownerId = userService.getByEmail(ownerEmail);
        if (ownerId.isPresent()) {
            User user = ownerId.get();

            // Extract the user's ID
            int newOwner = user.getId();

            return futsalService.getFutsalByOwnerId(newOwner);
        }
        throw new RuntimeException("Owner not found with email:"+ownerEmail);
    }


    @DeleteMapping("/deleteById/{id}")
    public void deleteFutsal(@PathVariable Integer id) {
        futsalService.deleteFutsal(id);
    }
}
