package com.abdul_aziz.controller;


import com.abdul_aziz.domain.OrderType;
import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.entity.Order;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.request.CreateOrderRequest;
import com.abdul_aziz.service.CoinService;
import com.abdul_aziz.service.OrderService;
import com.abdul_aziz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;
    @Autowired
    private CoinService coinService;


    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @RequestBody CreateOrderRequest req

    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(req.getCoinId());

        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Long orderId

    ) throws Exception {


        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.getOrderById(orderId);
        if (order.getUser().getId().equals(user.getId())) {
            return ResponseEntity.ok(order);
        }else {
            throw new Exception("invalid user");
        }

    }

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrders(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) OrderType orderType,
            @RequestParam(required = false) String asset_symbol
    ) throws Exception {

        Long userId = userService.findUserProfileByJwt(jwt).getId();
        List<Order> userOrders = orderService.getAllOrdersOfUsers(userId, orderType, asset_symbol);
        return ResponseEntity.ok(userOrders);
    }
}
