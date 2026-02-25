package com.abdul_aziz.service;

import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.Withdrawal;

import java.util.List;

public interface WithdrawalService {

    Withdrawal requestWithdrawal(Long amount, User user);

    Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    List<Withdrawal> getUserWithdrawalHistory(User user);

    List<Withdrawal> getAllWithdrawalRequest();


}
