package com.abdul_aziz.controller;

import com.abdul_aziz.domain.VerificationType;
import com.abdul_aziz.entity.ForgotPasswordToke;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.VerificationCode;
import com.abdul_aziz.request.ResetPasswordRequest;
import com.abdul_aziz.response.ApiResponse;
import com.abdul_aziz.response.AuthResponse;
import com.abdul_aziz.response.ForgetPasswordRequest;
import com.abdul_aziz.service.EmailService;
import com.abdul_aziz.service.ForgotPasswordService;
import com.abdul_aziz.service.UserService;
import com.abdul_aziz.service.VerificationCodeService;
import com.abdul_aziz.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserServiceController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(
            @RequestParam("Authorization") String jwt,
            @PathVariable VerificationType verificationType
    ) throws Exception{

        User user = userService.findUserProfileByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        if (verificationCode == null) {
            verificationCode = verificationCodeService.sendVerificationCode(user, verificationType);
        }
        if (verificationType.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationEmail(user.getEmail(), verificationCode.getOtp());
        }
        return new ResponseEntity<>("verification otp sent successfully",HttpStatus.OK);

    }


    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(
            @PathVariable String otp,
            @RequestParam("Authorization") String jwt
            ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo = verificationCode.getVerificationType()
                .equals(VerificationType.EMAIL)?verificationCode.getEmail(): verificationCode.getMobile();

        boolean isVerified = verificationCode.getOtp().equals(otp);
        if (isVerified) {
            User updateUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(), sendTo, user);

            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updateUser, HttpStatus.OK);
        }
        throw new Exception("wrong otp");
    }

    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(
            @PathVariable ForgetPasswordRequest req
    ) throws Exception{
        User user = userService.findUserByEmail(req.getSendTo());
        String otp = OtpUtils.generateOtp();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToke token = forgotPasswordService.findByUser(user.getId());
        if (token == null) {
            token = forgotPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());
        }

        if (req.getVerificationType().equals(VerificationType.EMAIL)) {
            emailService.sendVerificationEmail(user.getEmail(), token.getOtp());

        }

        AuthResponse response = new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("password reset otp sent successfully");

        return new ResponseEntity<>(response,HttpStatus.OK);

    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req,
            @RequestParam("Authorization") String jwt
    ) throws Exception {

        ForgotPasswordToke forgotPasswordToke = forgotPasswordService.findById(id);
        boolean isVerified = forgotPasswordToke.getOtp().equals(req.getOtp());
        if (isVerified) {
            userService.updatePassword(forgotPasswordToke.getUser(), req.getPassword());
            ApiResponse res = new ApiResponse();
            res.setMessage("password has been updated successfully");
            return new ResponseEntity<>(res,HttpStatus.OK);
        }
        throw new Exception("wrong otp");
    }

}
