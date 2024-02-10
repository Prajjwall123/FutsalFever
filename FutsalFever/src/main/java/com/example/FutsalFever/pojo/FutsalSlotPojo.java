package com.example.FutsalFever.pojo;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
public class FutsalSlotPojo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "futsalId", nullable = false)
    private Integer futsalId;
    @Column(name = "startTime", nullable = false)
    private String startTime;
    @Column(name = "endTime", nullable = false)
    private String endTime;
    @Column(name = "booked", nullable = false)
    private boolean booked;
}
