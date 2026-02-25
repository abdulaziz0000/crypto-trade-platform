package com.abdul_aziz.service;

import com.abdul_aziz.config.JwtProvider;
import com.abdul_aziz.domain.VerificationType;
import com.abdul_aziz.entity.TwoFactorAuth;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new Exception("user not found ");
        }
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = findUserByEmail(email);
        if (user == null) {
            throw new Exception("user not found");
        }
        return user;
    }

    @Override
    public User findUserById(long id) throws Exception {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new Exception("user not found");
        }
        return user.get();
    }

    @Override
    public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user) {

        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(verificationType);
        user.setTwoFactorAuth(twoFactorAuth);

        return userRepository.save(user);
    }


    @Override
    public User updatePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        return userRepository.save(user);
    }
}
