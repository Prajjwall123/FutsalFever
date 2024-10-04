package com.example.FutsalFever.service;

import com.example.FutsalFever.entity.Role;
import com.example.FutsalFever.pojo.RolePojo;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    void saveRole(RolePojo rolePojo);

    List<Role> getAllRoles();

    Optional<Role> getById(Integer id);

    void deleteById(Integer id);

    Role updateRole(Integer id, Role updatedRole);

    Optional<Role> getByRoleName(String name);

    void deleteByRoleName(String name);

    Role updateByRoleName(String name, Role updatedRole);

}
