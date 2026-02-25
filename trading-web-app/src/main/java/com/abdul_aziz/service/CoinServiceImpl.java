package com.abdul_aziz.service;

import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.repository.CoinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;

@Service
public class CoinServiceImpl implements CoinService{

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private ObjectMapper objectMapper;
    @Override
    public List<Coin> getCoinList(int page) throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            List<Coin> coinsList = objectMapper.readValue(response.getBody(),
                    new TypeReference<List<Coin>>() {
                    });
            return coinsList;
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/"
                + coinId +
                "/market_chart?vs_currency=usd&days=" + days;

        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }



    @Override
    public String getCoinDetails(String coinId) throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;
        RestTemplate restTemplate = new RestTemplate();

        try {

            ResponseEntity<String> response =
                    restTemplate.getForEntity(url, String.class);

            JsonNode root = objectMapper.readTree(response.getBody());

            Coin coin = new Coin();

            coin.setId(root.path("id").asText());
            coin.setName(root.path("name").asText());
            coin.setSymbol(root.path("symbol").asText());
            coin.setImage(root.path("image").path("large").asText());

            JsonNode marketData = root.path("market_data");

            coin.setCurrentPrice(
                    marketData.path("current_price").path("usd").asDouble());

            coin.setMarketCap(
                    marketData.path("market_cap").path("usd").asLong());

            coin.setMarketCapRank(
                    marketData.path("market_cap_rank").asInt());

            coin.setTotalVolume(
                    marketData.path("total_volume").path("usd").asLong());

            coin.setHigh24h(
                    marketData.path("high_24h").path("usd").asDouble());

            coin.setLow24h(
                    marketData.path("low_24h").path("usd").asDouble());

            coin.setPriceChange24h(
                    marketData.path("price_change_24h").asDouble());

            coin.setPriceChangePercentage24h(
                    marketData.path("price_change_percentage_24h").asDouble());

            coin.setMarketCapChange24h(
                    marketData.path("market_cap_change_24h").asLong());

            coin.setMarketCapChangePercentage24h(
                    marketData.path("market_cap_change_percentage_24h").asDouble());

            coin.setTotalSupply(
                    marketData.path("total_supply").asDouble());

            coinRepository.save(coin);

            return response.getBody();

        } catch (Exception e) {
            throw new Exception("Error fetching coin details: " + e.getMessage());
        }
    }


    @Override
    public Coin findById(String coinId) throws Exception {
        Optional<Coin> optionalCoin = coinRepository.findById(coinId);
        if (optionalCoin.isEmpty()) {
            throw new Exception("Coin not found");
        }
        return optionalCoin.get();
    }

    @Override
    public String searchCoin(String keyword) throws Exception {
        String url = "https://api.coingecko.com/api/v3/search?query=" + keyword;
        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTop50CoinsByMarketCapRank() throws Exception {

        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";


        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public String getTrendingCoin() throws Exception {

        String url = "https://api.coingecko.com/api/v3/search/trending";

        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            return response.getBody();
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new Exception(e.getMessage());
        }
    }
}
