package com.abdul_aziz.request;

import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String otp;
    private String password;
}
