package com.abdul_aziz.service;

import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.entity.WatchList;
import com.abdul_aziz.repository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchListServiceImpl implements WatchListService{
    @Autowired
   private WatchListRepository watchListRepository;
    @Override
    public WatchList findUserWatchList(Long userId) throws Exception {
        WatchList watchList = watchListRepository.findByUserId(userId);
        if (watchList == null) {
            throw new Exception("watchlist not found");
        }
        return watchList;
    }

    @Override
    public WatchList createWatchList(User user) {
        WatchList watchList = new WatchList();
        watchList.setUser(user);

        return watchListRepository.save(watchList);
    }

    @Override
    public WatchList findById(Long id) throws Exception {
        Optional<WatchList> watchList = watchListRepository.findById(id);
        if (watchList.isEmpty()) {
            throw new Exception(" watchlist not found");
        }
        return watchList.get();
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        WatchList watchList = findUserWatchList(user.getId());
        if (watchList.getCoins().contains(coin)){
            watchList.getCoins().remove(coin);
        }else {
            watchList.getCoins().add(coin);
        }
        watchListRepository.save(watchList);
        return coin;
    }
}
