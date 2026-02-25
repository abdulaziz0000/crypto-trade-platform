package com.abdul_aziz.service;

import com.abdul_aziz.domain.VerificationType;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.VerificationCode;
import com.abdul_aziz.repository.VerificationCodeRepository;
import com.abdul_aziz.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService{

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Override
    public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {

        VerificationCode verificationCode1 = new VerificationCode();
        verificationCode1.setOtp(OtpUtils.generateOtp());
        verificationCode1.setVerificationType(verificationType);
        verificationCode1.setUser(user);

        return verificationCodeRepository.save(verificationCode1);
    }
    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception {
        Optional<VerificationCode> verificationCode = verificationCodeRepository.findById(id);

        if (verificationCode.isPresent()) {
            return verificationCode.get();
        }
        throw new Exception("verification code not found");
    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long id) {
        return verificationCodeRepository.findByUserId(id);
    }

    @Override
    public void deleteVerificationCodeById(VerificationCode verificationCode) {
        verificationCodeRepository.delete(verificationCode);

    }
}
