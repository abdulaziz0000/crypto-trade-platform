package com.abdul_aziz.repository;

import com.abdul_aziz.entity.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin , String> {
}
