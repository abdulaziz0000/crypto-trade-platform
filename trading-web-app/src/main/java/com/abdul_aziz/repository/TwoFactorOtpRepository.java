package com.abdul_aziz.repository;

import com.abdul_aziz.entity.TwoFactorOtp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOtpRepository extends JpaRepository<TwoFactorOtp, Long> {

    TwoFactorOtp findByUserId(Long userId);
}
