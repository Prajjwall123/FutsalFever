package com.example.FutsalFever.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "futsal_slots")
@Getter
@Setter
public class FutsalSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "futsal_id") // Mapping the foreign key
    private Futsal futsal;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Column(name = "end_time", nullable = false)
    private String endTime;

    @Column(name = "is_booked", nullable = false)
    private boolean booked;
}
