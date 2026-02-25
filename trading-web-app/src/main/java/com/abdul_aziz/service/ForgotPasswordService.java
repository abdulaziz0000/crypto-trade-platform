package com.abdul_aziz.service;

import com.abdul_aziz.domain.VerificationType;
import com.abdul_aziz.entity.ForgotPasswordToke;
import com.abdul_aziz.entity.User;

public interface ForgotPasswordService {
    ForgotPasswordToke createToken(User user,
                                   String id, String otp,
                                   VerificationType verificationType,
                                   String sendTo);

    ForgotPasswordToke findById(String id);

    ForgotPasswordToke findByUser(Long userId);

    void deleteToken(ForgotPasswordToke forgotPasswordToke);
}
