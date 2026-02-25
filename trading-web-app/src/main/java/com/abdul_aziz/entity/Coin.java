package com.abdul_aziz.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Coin {

    @Id
    @JsonProperty("id")
    private String id;

    private String symbol;

    private String name;

    private String image;

    private Double currentPrice;

    private Long marketCap;

    private Integer marketCapRank;

    private Long fullyDilutedValuation;

    private Long totalVolume;

    private Double high24h;

    private Double low24h;

    private Double priceChange24h;

    private Double priceChangePercentage24h;

    private Long marketCapChange24h;

    private Double marketCapChangePercentage24h;

    private Double circulatingSupply;

    private Double totalSupply;

    private Double maxSupply;

    private Double ath;

    private Double athChangePercentage;

    private Double atl;

    private Double atlChangePercentage;

    private Date athDate;

//    @Column(nullable = true)
////    private Double roi;

    private Date lastUpdated;
}
