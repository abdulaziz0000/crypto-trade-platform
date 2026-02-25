package com.abdul_aziz.service;

import com.abdul_aziz.entity.PaymentDetails;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.repository.PaymentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {
    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;



    @Override
    public PaymentDetails addPaymentDetails(String accountNumber,
                                            String accountHolderName,
                                            String ifsc, String bankName,
                                            User user) {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountNumber(accountHolderName);
        paymentDetails.setIfsc(ifsc);
        paymentDetails.setBankName(bankName);
        paymentDetails.setUser(user);

        return paymentDetailsRepository.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(User user) {

        return paymentDetailsRepository.findByUserId(user.getId());
    }
}
