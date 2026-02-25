package com.abdul_aziz.repository;

import com.abdul_aziz.entity.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchListRepository extends JpaRepository<WatchList,Long> {
    WatchList findByUserId(Long userId);
}
