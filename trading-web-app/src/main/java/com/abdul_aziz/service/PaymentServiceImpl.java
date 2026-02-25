package com.abdul_aziz.service;

import com.abdul_aziz.domain.PaymentMethod;
import com.abdul_aziz.domain.PaymentOrderStatus;
import com.abdul_aziz.entity.PaymentOrder;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.repository.PaymentOrderRepository;
import com.abdul_aziz.response.PaymentResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;
    @Value("${stripe.api.key}")
    private String stripeSecretKey;
    @Value("${razorpay.api.key}")
    private String apikey;

    @Value("${razorpay.api.secret}")
    private String apiSecretKey;


    @Override
    public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) {
        return paymentOrderRepository.findById(id).orElseThrow(() -> new RuntimeException("payment order not found"));
    }

    @Override
    public boolean processPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {

        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
                RazorpayClient razorpay = new RazorpayClient(apikey, apiSecretKey);
                Payment payment = razorpay.payments.fetch(paymentId);

                Integer amount = payment.get("amount");
                String status = payment.get("status");

                if (status.equals("captured")) {
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                    return true;
                }
                paymentOrder.setStatus(PaymentOrderStatus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                return false;
            }
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
            paymentOrderRepository.save(paymentOrder);
            return true;
        }
        return false;
    }

    @Override
    public PaymentResponse createRazorpayPaymentLink(User user, Long amount,Long orderId) throws RazorpayException {


        if (user == null) {
            throw new RazorpayException("User is null");
        }

        String email = user.getEmail();

        if (email == null || email.trim().isEmpty()) {
            throw new RazorpayException("User email is missing");
        }

        email = email.trim().toLowerCase();

        if (!isValidEmail(email)) {
            throw new RazorpayException("Invalid email format: " + email);
        }
        Long amountInPaise = amount * 100;

        RazorpayClient razorpay = new RazorpayClient(apikey, apiSecretKey);

        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", amountInPaise);
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", user.getFullName());
        customer.put("email", user.getEmail().trim());

        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("email", true);
        paymentLinkRequest.put("notify", notify);

        paymentLinkRequest.put("reminder_enable", true);

        paymentLinkRequest.put("callback_url", "http://localhost:5455/wallet?order_id=" +orderId);
        paymentLinkRequest.put("callback_method", "get");

        PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(payment.get("short_url"));

        return res;
    }

    private boolean isValidEmail(String email) {
        return email != null &&
                !email.isBlank() &&
                email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
    }


    @Override
    public PaymentResponse createStripePaymentLink(
            User user,
            Long amount,
            Long orderId) throws StripeException, StripeException {

        Stripe.apiKey = stripeSecretKey;

        Long stripeAmount = amount * 100; // convert dollars → cents

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addPaymentMethodType(
                                SessionCreateParams.PaymentMethodType.CARD)
                        .setMode(SessionCreateParams.Mode.PAYMENT)

                        .setSuccessUrl(
                                "http://localhost:5455/wallet?order_id=" + orderId)

                        .setCancelUrl(
                                "http://localhost:5173/payment/cancel")

                        .setCustomerEmail(user.getEmail())

                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("usd")
                                                        .setUnitAmount(stripeAmount)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem
                                                                        .PriceData
                                                                        .ProductData
                                                                        .builder()
                                                                        .setName("Top up wallet")
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .build();   // 🔥 IMPORTANT
        Session session = Session.create(params);

        System.out.println("session ----  " + session);
        PaymentResponse res  = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }

}
