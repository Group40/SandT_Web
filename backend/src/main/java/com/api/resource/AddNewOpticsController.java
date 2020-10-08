package com.api.resource;

import com.api.model.Event;
import com.api.payload.response.MessageResponse;
import com.api.repository.OpticsRepository;
import com.api.service.AmazonImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/addoptics")
public class AddNewOpticsController {
    @Autowired
    private AmazonImageService amazonImageService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save")
    public MessageResponse addItem(
            @RequestPart(value = "image") MultipartFile file,
            @RequestPart(value = "title") String title,
            @RequestPart(value = "brand") String brand,
            @RequestPart(value = "model") String model,
            @RequestPart(value = "opticaldesign") String opticaldesign,
            @RequestPart(value = "aperture") String aperture,
            @RequestPart(value = "magnification") String magnification,
            @RequestPart(value = "focal") String focal,
            @RequestPart(value = "viewfinder") String viewfinder,
            @RequestPart(value = "price") String price,
            @RequestPart(value = "detail") String detail) {
        return this.amazonImageService.UploadItem(file,title,brand,title,model,opticaldesign,aperture,magnification,focal,viewfinder,price,detail);
    }
}
