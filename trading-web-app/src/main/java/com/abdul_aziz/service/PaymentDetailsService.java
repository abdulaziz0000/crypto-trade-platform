package com.abdul_aziz.service;

import com.abdul_aziz.entity.PaymentDetails;
import com.abdul_aziz.entity.User;

public interface PaymentDetailsService {
    PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName,
                                     String ifsc,
                                     String bankName,
                                     User user);

    PaymentDetails getUserPaymentDetails(User user);
}
