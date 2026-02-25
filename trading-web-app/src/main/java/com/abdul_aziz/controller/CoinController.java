package com.abdul_aziz.controller;

import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.service.CoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinController {

    @Autowired
    private CoinService coinService;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping()
    ResponseEntity<List<Coin>> getCoinList(@RequestParam( required = false, name = "page") int page) throws Exception {
        List<Coin> coins = coinService.getCoinList(page);
        return new ResponseEntity<>(coins, HttpStatus.ACCEPTED);

    }

    @GetMapping("/{coinId}/chart")
    ResponseEntity<JsonNode> getMarketChart(
            @PathVariable String coinId,
            @RequestParam("days") int days) throws Exception {
        String res = coinService.getMarketChart(coinId,days);
        JsonNode jsonNode = objectMapper.readTree(res);
        return new ResponseEntity<>(jsonNode, HttpStatus.ACCEPTED);

    }
    @GetMapping("/search")
    public ResponseEntity<JsonNode> searchCoin(
            @RequestParam("q") String keyword) throws Exception {

        String response = coinService.searchCoin(keyword);
        JsonNode jsonNode = objectMapper.readTree(response);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/top50")
    public ResponseEntity<JsonNode> getTop50Coins() throws Exception {

        String response = coinService.getTop50CoinsByMarketCapRank();
        JsonNode jsonNode = objectMapper.readTree(response);
        return ResponseEntity.ok(jsonNode);
    }


    @GetMapping("/trending")
    ResponseEntity<JsonNode> getTrendingCoin() throws Exception {
        String coins = coinService.getTrendingCoin();
        JsonNode jsonNode = objectMapper.readTree(coins);
        return ResponseEntity.ok(jsonNode);
    }

    @GetMapping("/details/{coinId}")
    ResponseEntity<JsonNode> getCoinDetails(@PathVariable String coinId) throws Exception {
        String coins = coinService.getCoinDetails(coinId);
        JsonNode jsonNode = objectMapper.readTree(coins);
        return ResponseEntity.ok(jsonNode);
    }
}
