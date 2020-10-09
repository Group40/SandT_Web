package com.api.repository;

import com.api.model.AppHomeScreen;
import com.api.security.service.ScrollImageFind;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppHomeScreenMobRepository extends MongoRepository<AppHomeScreen,String> {
    List<ScrollImageFind> findAllBy();
}
