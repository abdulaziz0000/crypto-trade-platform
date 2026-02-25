package com.abdul_aziz.request;

import com.abdul_aziz.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String coinId;
    private double quantity;
    private OrderType orderType;
}
