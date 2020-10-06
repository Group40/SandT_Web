package com.api.service;


import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class AmazonClientService {
    private AmazonS3 amazonS3;


    @Value("${amazon.s3.endpoint}")
    private String url;

    @Value("${amazon.s3.bucket-name}")
    private String bucketname;

    @Value("${amazon.s3.secret-key}")
    private String secretKey;

    @Value("${amazon.s3.access-key}")
    private String accessKey;

    protected AmazonS3 getAmazonS3() {
        return amazonS3;
    }

    protected String getUrl() {
        return url;
    }

    protected String getBucketname() {
        return bucketname;
    }

    protected AmazonS3 getClient() {
        return amazonS3;
    }

    @PostConstruct
    private void init(){
        BasicAWSCredentials credentials= new BasicAWSCredentials(accessKey,secretKey);

        this.amazonS3 = AmazonS3ClientBuilder.standard().withRegion(Regions.AP_SOUTH_1)
                .withCredentials(new AWSStaticCredentialsProvider(credentials)).build();

    }/*
    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.amazonS3 = new AmazonS3Client(credentials);
    }
*/

}