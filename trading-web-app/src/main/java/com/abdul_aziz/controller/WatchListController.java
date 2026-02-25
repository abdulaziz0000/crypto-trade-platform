package com.abdul_aziz.controller;

import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.WatchList;
import com.abdul_aziz.service.CoinService;
import com.abdul_aziz.service.UserService;
import com.abdul_aziz.service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {
    @Autowired
    private WatchListService watchListService;
    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<WatchList> getUserWatchList(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        WatchList watchList = watchListService.findUserWatchList(user.getId());
        return ResponseEntity.ok(watchList);
    }

    @GetMapping("/{watchlistId}")
    public ResponseEntity<WatchList> getWatchlistById(
            @PathVariable Long watchlistId
    ) throws Exception {

        WatchList watchList = watchListService.findById(watchlistId);
        return ResponseEntity.ok(watchList);
    }


    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchlist(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Coin coin = coinService.findById(coinId);

        Coin addCoin = watchListService.addItemToWatchlist(coin, user);
        return ResponseEntity.ok(addCoin);
    }




}
