package com.api.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class ForumService {

    private String ID = "id";
    private String Status = "status";
    
    public void sendForumID(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference ref = db.collection("messages").document(id);
        ApiFuture<DocumentSnapshot> future = ref.get();
        DocumentSnapshot document = future.get();
        if(document.exists()) {
            System.out.println("Document already exists");
        } else {
            Map<String, Object> data = new HashMap<>();
            data.put(ID, id);
            data.put(Status, "1");
            ApiFuture<com.google.cloud.firestore.WriteResult> write = db.collection("messages").document(id).set(data);
            System.out.println("Update time: " + write.get().getUpdateTime());
        }  
    }

    public void endForumID(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference ref = db.collection("messages").document(id);
        ApiFuture<DocumentSnapshot> future = ref.get();
        DocumentSnapshot document = future.get();
        if(document.exists()) {
            ref.update(Status, "0");
        } else {
            System.out.println("Document does not exixt");
        } 
    }
}