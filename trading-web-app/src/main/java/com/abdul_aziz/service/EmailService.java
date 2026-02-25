package com.abdul_aziz.service;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

//    public EmailService(JavaMailSender javaMailSender) {
//        this.javaMailSender = javaMailSender;
//    }

    public void sendVerificationEmail(String email, String otp) {

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setFrom("no-reply@yourapp.com");
            helper.setTo(email);
            helper.setSubject("Verify OTP");
            helper.setText("Your verification code is " + otp, false);

            javaMailSender.send(mimeMessage);

        } catch (MailException e) {
            throw new MailSendException("Failed to send email", e);
        } catch (Exception e) {
            throw new RuntimeException("Email creation failed", e);
        }
    }
}
