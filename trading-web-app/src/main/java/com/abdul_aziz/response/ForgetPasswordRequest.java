package com.abdul_aziz.response;

import com.abdul_aziz.domain.VerificationType;
import lombok.Data;

@Data
public class ForgetPasswordRequest {

    private String sendTo;
    private VerificationType verificationType;
}
