package com.abdul_aziz.repository;

import com.abdul_aziz.entity.ForgotPasswordToke;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToke,String> {

    ForgotPasswordToke findByUserId(Long userId);

}
