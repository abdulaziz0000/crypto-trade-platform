package com.abdul_aziz.service;

import com.abdul_aziz.domain.VerificationType;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.VerificationCode;

public interface VerificationCodeService {

    VerificationCode sendVerificationCode(User user, VerificationType verificationType);


    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long id);


    void deleteVerificationCodeById(VerificationCode verificationCode);

}
