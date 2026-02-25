package com.abdul_aziz.service;

import com.abdul_aziz.entity.Order;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.Wallet;

public interface WalletService {

    Wallet getUserWallet(User user);

    Wallet addBalance(Wallet wallet, Long money);

    Wallet findWalletById(Long id) throws Exception;

    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, User user) throws Exception;
}
