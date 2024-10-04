package com.example.FutsalFever.service.impl;

import com.example.FutsalFever.entity.Futsal;
import com.example.FutsalFever.entity.Role;
import com.example.FutsalFever.pojo.RolePojo;
import com.example.FutsalFever.repository.RoleRepository;
import com.example.FutsalFever.service.RoleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    @Override
    public Optional<Role> getById(Integer id) {
        return roleRepository.findById(id);
    }

    @Override
    public void deleteById(Integer id) {
        roleRepository.deleteById(id);
    }

    @Override
    public void deleteByRoleName(String name) {
        Optional<Role> role= roleRepository.getRoleByRoleName(name);
        if (role.isPresent()){
            int id= role.get().getId();
            roleRepository.deleteById(id);
        }
        else{
            throw new RuntimeException("Role with name "+name+" is not registerd.");
        }

    }

    @Override
    public Optional<Role> getByRoleName(String name) {
        return roleRepository.getRoleByRoleName(name);
    }

    @Override
    public void saveRole(RolePojo rolePojo) {
        // Check if the role with the given name already exists
        Optional<Role> existingRole = roleRepository.getRoleByRoleName(rolePojo.name);

        if (existingRole.isPresent()) {
            // If the role with the same name exists, throw an exception
            throw new RuntimeException("Role with name '" + rolePojo.name + "' is already registered.");
        }

        // Create a new Role object or find an existing one if updating
        Role role;
        if (rolePojo.id != null) {
            role = roleRepository.findById(rolePojo.id)
                    .orElseThrow(() -> new NoSuchElementException("No role found with ID: " + rolePojo.id));
        } else {
            role = new Role();
        }

        // Set the name of the role
        role.setName(rolePojo.name);

        // Save the role to the repository
        roleRepository.save(role);

        // Log the success message
        System.out.println("Role registered successfully.");
    }


    @Override
    public Role updateRole(Integer id, Role updatedRole) {
        System.out.println(id);
        Optional<Role> optionalRole = roleRepository.findById(id);

        if (optionalRole.isPresent()) {
            Role role = optionalRole.get();

            System.out.println("Role name is" + role.getName());

            role.setName(updatedRole.getName());
            System.out.println("in impl" + updatedRole.getName());


            return roleRepository.save(role);
        } else {
            throw new EntityNotFoundException("Role not found with id: " + id);
        }

    }

    @Override
    public Role updateByRoleName(String name, Role updatedRole) {
        Optional<Role> optionalRole = roleRepository.getRoleByRoleName(name);

        if (optionalRole.isPresent()) {
            Role existingRole = optionalRole.get();
            String newName = updatedRole.getName();

            // Check if the new name is already taken by another role
            Optional<Role> roleWithNewName = roleRepository.getRoleByRoleName(newName);
            if (roleWithNewName.isPresent() && !roleWithNewName.get().getName().equals(existingRole.getName())) {
                throw new EntityNotFoundException("Role with name: " + newName + " already exists");
            }

            // If the new name is not taken, update the role's name
            existingRole.setName(newName);
            return roleRepository.save(existingRole);
        } else {
            throw new EntityNotFoundException("Role not found with name: " + name);
        }
    }

}
