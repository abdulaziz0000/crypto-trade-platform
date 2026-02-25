package com.abdul_aziz.entity;

import com.abdul_aziz.domain.PaymentMethod;
import com.abdul_aziz.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long id;

    private Long amount;

    private PaymentOrderStatus status;

    private PaymentMethod paymentMethod;

    @ManyToOne
    private User user;
}
