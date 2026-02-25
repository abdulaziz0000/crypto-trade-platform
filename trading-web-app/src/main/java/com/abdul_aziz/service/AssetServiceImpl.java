package com.abdul_aziz.service;

import com.abdul_aziz.entity.Asset;
import com.abdul_aziz.entity.Coin;
import com.abdul_aziz.entity.User;
import com.abdul_aziz.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetServiceImpl implements AssetService {
    @Autowired
    private AssetRepository assetRepository;

    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {

        Asset asset = new Asset();
        asset.setUser(user);
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coin.getCurrentPrice());
        return assetRepository.save(asset);
    }

    @Override
    public Asset getAssetById(Long assetId) {
        return assetRepository.findById(assetId).orElseThrow(()-> new RuntimeException("Asset not found"));

    }

    @Override
    public Asset getAssetByUserIdAndId(Long userId, Long assetId) {

        return null;
    }

    @Override
    public List<Asset> getUsersAssets(Long userId) {

        return  assetRepository.findByUserId(userId);
    }

    @Override
    public Asset updateAsset(Long assetId, double quantity) {
        Asset oldAsset = getAssetById(assetId);
        oldAsset.setQuantity(quantity);
        return  assetRepository.save(oldAsset);
    }

    @Override
    public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {

        return assetRepository.findByUserIdAndCoinId(userId,coinId);

    }

    @Override
    public void deleteAsset(Long assetId) {
        assetRepository.deleteById(assetId);

    }
}
