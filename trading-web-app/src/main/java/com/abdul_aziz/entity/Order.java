package com.abdul_aziz.entity;


import com.abdul_aziz.domain.OrderStatus;
import com.abdul_aziz.domain.OrderType;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private OrderType orderType;

    @Column(nullable = false)
    private BigDecimal price;

    private LocalDateTime timeStamp = LocalDateTime.now();

    @Column(nullable = false)
    private OrderStatus orderStatus;

    @OneToOne(mappedBy = "order" ,cascade = CascadeType.ALL)
    private OrderItem orderItem;


}
