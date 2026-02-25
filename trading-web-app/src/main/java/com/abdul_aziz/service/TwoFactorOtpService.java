package com.abdul_aziz.service;

import com.abdul_aziz.entity.TwoFactorOtp;
import com.abdul_aziz.entity.User;

public interface TwoFactorOtpService {

    TwoFactorOtp createTwoFactorOtp(User user, String otp, String jwt);

    TwoFactorOtp findByUser(Long userId);

    TwoFactorOtp findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOtp twoFactorOtp , String otp);

    void deleteTwoFactorOtp(TwoFactorOtp twoFactorOtp);


}
