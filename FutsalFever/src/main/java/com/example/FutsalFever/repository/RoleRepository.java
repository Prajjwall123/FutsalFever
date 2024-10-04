package com.example.FutsalFever.repository;

import com.example.FutsalFever.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query(value = "Select * from roles where name=?1",nativeQuery = true)
    Optional<Role> getRoleByRoleName(String name);
}
