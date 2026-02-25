package com.abdul_aziz.service;

import com.abdul_aziz.domain.VerificationType;
import com.abdul_aziz.entity.User;

public interface UserService {

    public User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(long id) throws Exception;

    User enableTwoFactorAuthentication(VerificationType verificationType,
                                       String sendTo,
                                       User user);

    User updatePassword(User user, String newPassword);
}
