package com.example.FutsalFever.Controller;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.service.FutsalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.FutsalFever.service.UserService;
import com.example.FutsalFever.repository.UserRepository;

import java.util.List;
import java.util.Optional;

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

    @PostMapping("/save")
    public Futsal saveFutsal(@RequestBody Futsal futsal) {
        // Fetch the authenticated user details
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName(); // Get the authenticated user's email

        // Fetch the User entity from the database based on the user email
        Optional<User> userOptional = userService.getByEmail(currentUserEmail);

        if (userOptional.isPresent()) {
            User user = userOptional.get(); // Extract the User object from the Optional
            // Set the User entity to the user field of the Futsal entity
            futsal.setUser(user);

            // Save the Futsal entity
            return futsalService.saveFutsal(futsal);
        } else {
            // Handle the case where the user is not found
            throw new RuntimeException("User not found with email: " + currentUserEmail);
        }
    }

    @PutMapping("/updateById/{id}")
    public Futsal updateFutsal(@PathVariable Integer id, @RequestBody Futsal updatedFutsal) {
        return futsalService.updateFutsal(id, updatedFutsal);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteFutsal(@PathVariable Integer id) {
        futsalService.deleteFutsal(id);
    }
}
