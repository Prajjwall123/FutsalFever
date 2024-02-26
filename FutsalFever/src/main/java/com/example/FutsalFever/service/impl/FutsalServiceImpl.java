package com.example.FutsalFever.service.impl;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.repository.FutsalRepository;
import com.example.FutsalFever.service.FutsalService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FutsalServiceImpl implements FutsalService {

    @Autowired
    private FutsalRepository futsalRepository;


    @Override
    public List<Futsal> getAllFutsals() {
        return futsalRepository.findAll();
    }

    @Override
    public Futsal getFutsalById(Integer id) {
        return futsalRepository.findById(id).orElse(null);
    }

    @Override
    public Futsal getFutsalByName(String name) {
        return futsalRepository.findByName(name);
    }
    @Override
    public Futsal saveFutsal(Futsal futsal) {
        // Get the user associated with the futsal
        User user = futsal.getUser();

        // Check if the user has already created a futsal
        if (userHasFutsal(user)) {
            throw new RuntimeException("User has already created a futsal");
        }

        // Save the futsal
        return futsalRepository.save(futsal);
    }

    public boolean userHasFutsal(User user) {
        // Check if the user has already created a futsal
        return futsalRepository.existsByUser(user);
    }


    @Override
    public void deleteFutsal(Integer id) {
        futsalRepository.deleteById(id);
    }

    @Override
    public Futsal updateFutsal(Integer id, Futsal updatedFutsal) {
        Futsal futsal = futsalRepository.findById(id).orElse(null);
        if (futsal != null) {
            futsal.setName(updatedFutsal.getName());
            futsal.setAddress(updatedFutsal.getAddress());
            futsal.setPrice(updatedFutsal.getPrice());
            futsal.setImage(updatedFutsal.getImage());
            futsal.setQr(updatedFutsal.getQr());
            return futsalRepository.save(futsal);
        }
        return null;
    }

    public Futsal getFutsalByOwnerId(Integer ownerId) {
        // Delegate the call to the repository method to fetch futsal by owner ID
        return futsalRepository.findByUserId(ownerId)
                .orElseThrow(() -> new EntityNotFoundException("Futsal not found for owner ID: " + ownerId));
    }



}
