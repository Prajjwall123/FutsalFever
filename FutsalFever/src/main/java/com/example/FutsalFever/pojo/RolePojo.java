package com.example.FutsalFever.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

public class RolePojo {
    public Integer id;

    @NotNull(message = "Role name is required")
    public String name;
}
