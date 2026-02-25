package com.abdul_aziz.entity;

import com.abdul_aziz.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ForgotPasswordToke {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    @OneToOne
    private User user;

    private String otp;

    private VerificationType verificationType;

    private String sendTo;
}
