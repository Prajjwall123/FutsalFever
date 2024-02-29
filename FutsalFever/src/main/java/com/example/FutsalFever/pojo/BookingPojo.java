package com.example.FutsalFever.pojo;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingPojo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "slotId", nullable = false)
    private Integer slotId;
    @Column(name = "userId", nullable = false)
    private Integer userId;
    @NotNull
    private MultipartFile paymentImage;
    @Column(name = "verified", nullable = false)
    private boolean verified = false;
    @Column(name = "futsalId", nullable = false)
    private Integer futsalId;
    @Column(name = "username", nullable = false)
    private String username;
}
