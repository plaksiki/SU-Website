package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "options")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "question_id")
    private long questionId;

    private String text;

    @Column(name = "order_index")
    private int orderIndex;

    public long getId() { return id; }
    public String getText() { return text; }
    public int getOrderIndex() { return orderIndex; }
}