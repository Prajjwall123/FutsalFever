package com.example.FutsalFever.service;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.FutsalSlot;

import java.util.List;
import java.util.Set;

public interface FutsalService {
    List<Futsal> getAllFutsals();
    Futsal getFutsalById(Integer id);
    Futsal saveFutsal(Futsal futsal);
    void deleteFutsal(Integer id);
    Futsal updateFutsal(Integer id, Futsal updatedFutsal);
    Futsal getFutsalByOwnerId(Integer ownerId);
    Futsal getFutsalByName(String name);
}
