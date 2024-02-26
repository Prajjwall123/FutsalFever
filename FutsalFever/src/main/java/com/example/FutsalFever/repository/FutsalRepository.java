package com.example.FutsalFever.repository;


import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FutsalRepository extends JpaRepository<Futsal, Integer> {
    Futsal findByName(String name);
    Optional<Futsal> findByUserId(Integer userId);
    boolean existsByUser(User user);
}
