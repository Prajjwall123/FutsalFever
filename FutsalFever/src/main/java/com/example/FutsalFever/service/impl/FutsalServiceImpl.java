package com.example.FutsalFever.service.impl;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.repository.FutsalRepository;
import com.example.FutsalFever.service.FutsalService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.FutsalFever.util.ImageToBase64;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class FutsalServiceImpl implements FutsalService {

    @Autowired
    private FutsalRepository futsalRepository;

    private final String UPLOAD_DIRECTORY = new StringBuilder()
            .append(System.getProperty("user.dir"))
            .append("/futsalFeverApp/Images")
            .toString();

    ImageToBase64 imageToBase64 = new ImageToBase64();

    @Override
    public List<Futsal> getAllFutsals() {
        List<Futsal> futsals = futsalRepository.findAll();
        futsals.forEach(futsal -> futsal.setImage(imageToBase64.getImageBase64("/Images/" + futsal.getImage())));
        return futsals;
    }

    @Override
    public Futsal getFutsalById(Integer id) {
        Futsal futsal = futsalRepository.findById(id).orElse(null);
        if (futsal != null) {
            // Get the image path from the futsal object and convert it to base64
            String imagePath = "/Images/" + futsal.getImage();
            String base64Image = imageToBase64.getImageBase64(imagePath);
            // Set the base64 image in the futsal object
            futsal.setImage(base64Image);
        }
        return futsal;
    }


    @Override
    public Futsal getFutsalByName(String name) {
        Futsal futsal = futsalRepository.findByName(name);
        if (futsal != null) {
            // Get the image path from the futsal object and convert it to base64
            String imagePath = "/Images/" + futsal.getImage();
            String base64Image = imageToBase64.getImageBase64(imagePath);
            // Set the base64 image in the futsal object
            futsal.setImage(base64Image);
        }
        return futsal;
    }


    @Override
    public Futsal saveFutsal(Futsal futsal, MultipartFile imageFile) {
        // Convert and save image to directory
        String filename = saveImage(imageFile);

        // Set image filename to the futsal
        futsal.setImage(filename);

        // Get the user associated with the futsal
        User user = futsal.getUser();

        // Check if the user has already created a futsal
        if (userHasFutsal(user)) {
            throw new RuntimeException("User has already created a futsal");
        }

        // Save the futsal
        return futsalRepository.save(futsal);
    }

    private String saveImage(MultipartFile imageFile) {
        try {
            String filename = imageFile.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIRECTORY, filename);
            Files.write(path, imageFile.getBytes());
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image: " + e.getMessage());
        }
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

    @Override
    public Futsal getFutsalByOwnerId(Integer ownerId) {
        // Delegate the call to the repository method to fetch futsal by owner ID
        Futsal futsal = futsalRepository.findByUserId(ownerId)
                .orElseThrow(() -> new EntityNotFoundException("Futsal not found for owner ID: " + ownerId));

        // Get the image path from the futsal object and convert it to base64
        String imagePath = "/Images/" + futsal.getImage();
        String base64Image = imageToBase64.getImageBase64(imagePath);

        // Set the base64 image in the futsal object
        futsal.setImage(base64Image);

        return futsal;
    }

}
