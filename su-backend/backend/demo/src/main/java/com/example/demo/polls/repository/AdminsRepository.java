package com.example.demo.polls.repository;

import com.example.demo.polls.entity.Admins;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminsRepository
        extends JpaRepository<Admins, Long> {
}
