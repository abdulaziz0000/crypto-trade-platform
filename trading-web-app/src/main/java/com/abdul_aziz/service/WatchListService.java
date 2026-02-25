package com.abdul_aziz.service;

import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.WatchList;

public interface WatchListService {

    WatchList findUserWatchList(Long userId) throws Exception;

    WatchList createWatchList(User user);

    WatchList findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;

}
