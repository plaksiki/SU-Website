package com.example.demo.events.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
public class PhotoController {

    @Value("${upload.path:/app/uploads}")
    private String uploadPath;

    @PostMapping("/event/{id}/photos")
    public ResponseEntity<List<String>> uploadPhotos(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files) throws IOException {

        Path dir = Paths.get(uploadPath, "events", String.valueOf(id));
        Files.createDirectories(dir);

        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path dest = dir.resolve(filename);
            file.transferTo(dest);
            urls.add("/uploads/events/" + id + "/" + filename);
        }
        return ResponseEntity.ok(urls);
    }

    @DeleteMapping("/event/{id}/photos")
    public ResponseEntity<Void> deletePhoto(
            @PathVariable Long id,
            @RequestParam("url") String url) throws IOException {

        String filename = url.substring(url.lastIndexOf('/') + 1);
        Path file = Paths.get(uploadPath, "events", String.valueOf(id), filename);
        Files.deleteIfExists(file);
        return ResponseEntity.ok().build();
    }
}
