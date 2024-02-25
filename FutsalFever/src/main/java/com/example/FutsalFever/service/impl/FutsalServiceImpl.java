package com.example.FutsalFever.service.impl;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.repository.FutsalRepository;
import com.example.FutsalFever.service.FutsalService;
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
    public Futsal saveFutsal(Futsal futsal) {
        return futsalRepository.save(futsal);
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


}
