package com.example.FutsalFever.pojo;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Getter
@Setter
public class FutsalSlotPojo {
    private Integer id;
    @NotNull(message = "futsal id cant be null")
    private Integer futsalId;
    @Column(name = "startTime", nullable = false)
    private String startTime;
    @Column(name = "endTime", nullable = false)
    private String endTime;
    @Column(name = "booked", nullable = false)
    private boolean booked;
}
