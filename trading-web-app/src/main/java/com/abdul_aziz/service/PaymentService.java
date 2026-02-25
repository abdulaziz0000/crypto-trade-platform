package com.abdul_aziz.service;

import com.abdul_aziz.domain.PaymentMethod;
import com.abdul_aziz.entity.PaymentOrder;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.response.PaymentResponse;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount,
                             PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id);

    boolean processPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount,Long orderId) throws RazorpayException;


    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;


}
