package com.abdul_aziz.service;

import com.abdul_aziz.domain.VerificationType;
import com.abdul_aziz.entity.ForgotPasswordToke;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.repository.ForgotPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService{
    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;
    @Override
    public ForgotPasswordToke createToken(User user, String id, String otp, VerificationType verificationType, String sendTo) {

        ForgotPasswordToke token = new ForgotPasswordToke();
        token.setUser(user);
        token.setSendTo(sendTo);
        token.setOtp(otp);
        token.setId(id);
        token.setVerificationType(verificationType);

        return forgotPasswordRepository.save(token);
    }

    @Override
    public ForgotPasswordToke findById(String id) {
        Optional<ForgotPasswordToke> token = forgotPasswordRepository.findById(id);

        return token.orElseThrow(null);
    }

    @Override
    public ForgotPasswordToke findByUser(Long userId) {

        return forgotPasswordRepository.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToke token) {
        forgotPasswordRepository.delete(token);

    }
}
