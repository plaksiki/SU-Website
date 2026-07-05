package com.example.demo.repository;
import com.example.demo.entity.Options;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionsRepository
        extends JpaRepository<Options, Long> {
}
