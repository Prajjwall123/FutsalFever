package com.example.FutsalFever.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.UserPojo;
import com.example.FutsalFever.service.UserService;

import java.util.List;
import java.util.Optional;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor

public class UserController {

    private final UserService userService;

    @PostMapping("/save")
    public String saveUser(@Valid @RequestBody UserPojo userPojo){
        userService.saveUser(userPojo);
        return "data created successfully";
    }

    @PostMapping("/saveAdmin")
    public String saveAdminUser(@Valid @RequestBody UserPojo userPojo){
        userPojo.set_admin(true);
        userService.saveUser(userPojo);
        return "admin user created successfully.";
    }

    @PostMapping("/checkAdmin")
    public boolean checkAdminUser( String userEmail) {
        boolean isAdmin = userService.isAdmin(userEmail);

        if (isAdmin) {
            return true;
        } else {
            return false;
        }
    }

    @GetMapping("/getAll")
    public List<User> getAllData(){
        return userService.getAllData();
    }

    @GetMapping("/getById/{id}")
    public Optional<User> getDataBtId(@PathVariable("id") Integer id){
        return userService.getById(id);
    }

    @GetMapping("/getByEmail/{email}")
    public Optional<User> getDataByEmail(@PathVariable("email") String email){
        return userService.getByEmail(email);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        userService.deleteById(id);
    }

}
