package com.example.FutsalFever.pojo;

import jakarta.validation.constraints.NotNull;

import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

public class FutsalPojo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    private MultipartFile image;


    @NotNull
    private String qrUrl;

    @Column(name = "user_id")
    private Integer userId;
}
