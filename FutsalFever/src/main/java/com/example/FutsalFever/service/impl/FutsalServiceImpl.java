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
import java.util.Optional;

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
            String imagePath = "/Images/" + futsal.getImage();
            String base64Image = imageToBase64.getImageBase64(imagePath);
            futsal.setImage(base64Image);
        }
        return futsal;
    }


    @Override
    public Futsal saveFutsal(Futsal futsal, MultipartFile imageFile) {
        String filename = saveImage(imageFile);

        futsal.setImage(filename);

        User user = futsal.getUser();

        if (userHasFutsal(user)) {
            throw new RuntimeException("User has already created a futsal");
        }

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
        return futsalRepository.existsByUser(user);
    }

    @Override
    public void deleteFutsal(Integer id) {
        futsalRepository.deleteById(id);
    }

    @Override
    public Futsal updateFutsal(Integer id, Futsal updatedFutsal, MultipartFile imageFile) {
        System.out.println(id);
        Optional<Futsal> optionalFutsal = futsalRepository.findByUserId(id);

        if (optionalFutsal.isPresent()) {
            Futsal futsal = optionalFutsal.get(); // Extract the Futsal object from Optional

            System.out.println("futsal name is" + futsal.getName());

            futsal.setName(updatedFutsal.getName());
            futsal.setAddress(updatedFutsal.getAddress());
            futsal.setPrice(updatedFutsal.getPrice());
            futsal.setQr(updatedFutsal.getQr());

            System.out.println("in impl" + updatedFutsal.getName());
            System.out.println("in impl" + updatedFutsal.getPrice());

            if (imageFile != null && !imageFile.isEmpty()) {
                String filename = saveImage(imageFile);
                futsal.setImage(filename);
                System.out.println("new file name set in impl:" + filename);
            }

            return futsalRepository.save(futsal);
        } else {
            throw new EntityNotFoundException("Futsal not found with id: " + id);
        }

    }
    @Override
    public Futsal getFutsalByOwnerId(Integer ownerId) {
        Futsal futsal = futsalRepository.findByUserId(ownerId)
                .orElseThrow(() -> new EntityNotFoundException("Futsal not found for owner ID: " + ownerId));

        String imagePath = "/Images/" + futsal.getImage();
        String base64Image = imageToBase64.getImageBase64(imagePath);

        futsal.setImage(base64Image);

        return futsal;
    }

}
