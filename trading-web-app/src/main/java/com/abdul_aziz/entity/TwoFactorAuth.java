package com.abdul_aziz.entity;

import com.abdul_aziz.domain.VerificationType;
import lombok.Data;

@Data

public class TwoFactorAuth {

    private boolean isEnabled = false;

    private VerificationType sendTo;


}
