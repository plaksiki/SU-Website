package com.example.demo.repository;
import com.example.demo.entity.Admins;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminsRepository
        extends JpaRepository<Admins, Long> {
}
