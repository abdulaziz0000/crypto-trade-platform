package com.abdul_aziz.controller;

import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.Wallet;
import com.abdul_aziz.entity.WalletTransaction;
import com.abdul_aziz.entity.Withdrawal;
import com.abdul_aziz.service.UserService;
import com.abdul_aziz.service.WalletService;
import com.abdul_aziz.service.WithdrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class WithdrawalController {
    @Autowired
    private WithdrawalService withdrawalService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;


    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @PathVariable Long amount,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Wallet userWallet = walletService.getUserWallet(user);

        Withdrawal withdrawal = withdrawalService.requestWithdrawal(amount, user);
        walletService.addBalance(userWallet, -withdrawal.getAmount());
        return new ResponseEntity<>(withdrawal, HttpStatus.OK);

    }

    @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithdrawal(
            @PathVariable Long id,
            @PathVariable boolean accept,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Withdrawal withdrawal = withdrawalService.proceedWithdrawal(id, accept);

        Wallet userWallet = walletService.getUserWallet(user);
        if (!accept) {
            walletService.addBalance(userWallet, -withdrawal.getAmount());
        }
        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @GetMapping("/api/withdrawal")
    public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(
            @RequestHeader("Authorization") String jwt

    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        List<Withdrawal> withdrawals = withdrawalService.getUserWithdrawalHistory(user);
        return new ResponseEntity<>(withdrawals, HttpStatus.OK);

    }

    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<Withdrawal>> getAllWithdrawalRequest(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        List<Withdrawal> withdrawals = withdrawalService.getAllWithdrawalRequest();
        return new ResponseEntity<>(withdrawals, HttpStatus.OK);
    }
}
