package com.example.FutsalFever.repository;
import com.example.FutsalFever.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "Select * from users where email=?1",nativeQuery = true)
    Optional<User> getUserByEmail(String email);

    @Query("SELECT u.is_admin FROM User u WHERE u.email = :email")
    boolean isAdmin(@Param("email") String email);

}
