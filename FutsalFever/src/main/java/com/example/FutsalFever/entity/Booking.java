package com.example.FutsalFever.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "slot_id")
    private FutsalSlot slot;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "payment_image",nullable=false)
    private String paymentImage;

    @Column(name = "verified", nullable = false)
    private boolean verified = false;

    @ManyToOne
    @JoinColumn(name = "futsal_id")
    private Futsal futsal;

    @Column(name = "username",nullable=false)
    private String username;

}
