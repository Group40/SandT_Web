package com.api.service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.auth.oauth2.GoogleCredentials;

import org.springframework.stereotype.Service;
import lombok.extern.log4j.Log4j2;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

@Log4j2
@Service
public class FirebaseService {

    @PostConstruct
    private void initialize() {
        try {
            InputStream serviceAccount = new FileInputStream(
                    "./sandtgroup-30435-firebase-adminsdk-mqkp5-185b5740d0.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(credentials).build();
            // Firestore db = FirestoreClient.getFirestore();

            if(FirebaseApp.getApps().isEmpty()) { 
                FirebaseApp.initializeApp(options);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}