package com.example.FutsalFever.service;

import com.example.FutsalFever.entity.Futsal;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FutsalService {
    List<Futsal> getAllFutsals();
    Futsal getFutsalById(Integer id);
    Futsal saveFutsal(Futsal futsal, MultipartFile imageFile);
    void deleteFutsal(Integer id);
    Futsal updateFutsal(Integer id, Futsal updatedFutsal,MultipartFile imageFile);
    Futsal getFutsalByOwnerId(Integer ownerId);
    Futsal getFutsalByName(String name);
}
