package com.example.FutsalFever.Controller;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.Role;
import com.example.FutsalFever.entity.User;
import com.example.FutsalFever.pojo.RolePojo;
import com.example.FutsalFever.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping("/save")
    public String saveRole(@Valid @RequestBody RolePojo rolePojo){
        roleService.saveRole(rolePojo);
        return "data created successfully";
    }

    @GetMapping("/getAll")
    public List<Role> getAllRole(){
        return roleService.getAllRoles();
    }

    @GetMapping("/getById/{id}")
    public Optional<Role> getRoleById(@PathVariable("id") Integer id){
        return roleService.getById(id);
    }

    @GetMapping("/getByName/{name}")
    public Optional<Role> getDataByName(@PathVariable("name") String name){
        return roleService.getByRoleName(name);
    }

    @DeleteMapping("/deleteByName/{name}")
    public void deleteByName(@PathVariable("name") String name){
        roleService.deleteByRoleName(name);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        roleService.deleteById(id);
    }

    @PutMapping("/updateByName/{name}")
    public Role updateRoleByName(@RequestBody Role updatedRole, @PathVariable String name) {
        return roleService.updateByRoleName(name, updatedRole);
    }
}
