package com.abdul_aziz.service;

import com.abdul_aziz.domain.OrderType;
import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.entity.Order;
import com.abdul_aziz.entity.OrderItem;
import com.abdul_aziz.entity.User;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;
    List<Order> getAllOrdersOfUsers(Long userId,OrderType orderType,String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
