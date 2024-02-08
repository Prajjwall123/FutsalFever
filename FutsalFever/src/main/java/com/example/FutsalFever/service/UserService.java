package com.example.FutsalFever.service;

import java.util.List;
import java.util.Optional;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.UserPojo;

public interface UserService {

    void saveUser(UserPojo userPojo);

    List<User> getAllData();

    Optional<User> getById(Integer id);

    void deleteById(Integer id);
}
