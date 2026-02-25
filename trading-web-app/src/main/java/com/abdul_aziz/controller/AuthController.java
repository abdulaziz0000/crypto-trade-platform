package com.abdul_aziz.controller;

import com.abdul_aziz.config.JwtProvider;
import com.abdul_aziz.entity.TwoFactorAuth;
import com.abdul_aziz.entity.TwoFactorOtp;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.repository.UserRepository;
import com.abdul_aziz.response.AuthResponse;
import com.abdul_aziz.service.CustomUserDetailsService;
import com.abdul_aziz.service.EmailService;
import com.abdul_aziz.service.TwoFactorOtpService;
import com.abdul_aziz.service.WatchListService;
import com.abdul_aziz.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TwoFactorOtpService twoFactorOtpService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private WatchListService watchListService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {



        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if (isEmailExist != null) {
            throw new Exception("User already exists");
        }
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        newUser.setFullName(user.getFullName());

        User savedUser = userRepository.save(newUser);
        watchListService.createWatchList(savedUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword()
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("user registered successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception {

        String username = user.getEmail();
        String password = user.getPassword();


        Authentication auth = authenticate(username,password);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        User authUser = userRepository.findByEmail(user.getEmail());

        if (user.getTwoFactorAuth().isEnabled()){
            AuthResponse res = new AuthResponse();
            res.setMessage("two factor authentication is enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp = OtpUtils.generateOtp();

            TwoFactorOtp oldTwoFactorOtp = twoFactorOtpService.findByUser(authUser.getId());
            if (oldTwoFactorOtp != null) {
                twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOtp);
            }
            TwoFactorOtp newTwoFactorOtp = twoFactorOtpService.createTwoFactorOtp(authUser, otp, jwt);

            emailService.sendVerificationEmail(username,otp);


            res.setSession(String.valueOf(newTwoFactorOtp.getId()));
            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }

        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("logged in successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("invalid username");
        }
        if (!password.equals(userDetails.getPassword())) {
            throw new BadCredentialsException("incorrect password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, password,userDetails.getAuthorities());
    }


//    public ResponseEntity<AuthResponse> verifySigninOtp(@PathVariable String otp, @RequestParam String id) throws Exception {
//
//        TwoFactorOtp twoFactorOtp = twoFactorOtpService.findById(id);
//
//        if (twoFactorOtpService.verifyTwoFactorOtp(twoFactorOtp, otp)) {
//            AuthResponse res = new AuthResponse();
//            res.setMessage("Two factor authentication verfied");
//            res.setTwoFactorAuthEnabled(true);
//            res.setJwt(twoFactorOtp.getJwt());
//            return new ResponseEntity<>(res, HttpStatus.OK);
//
//        }
//        throw new Exception("invalid otp");
//    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySigninOtp(
            @PathVariable String otp,
            @RequestParam String id) {

        TwoFactorOtp twoFactorOtp = twoFactorOtpService.findById(id);

        if (twoFactorOtp == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid request id"
            );
        }

        boolean isValid = twoFactorOtpService.verifyTwoFactorOtp(twoFactorOtp, otp);

        if (!isValid) {
            throw new BadCredentialsException("Invalid OTP");
        }

        AuthResponse res = new AuthResponse();
        res.setMessage("Two factor authentication verified");
        res.setTwoFactorAuthEnabled(true);
        res.setJwt(twoFactorOtp.getJwt());

        return ResponseEntity.ok(res);
    }


}
