package com.example.demo.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "options")
public class Options {
    @Id
    private Long id;
    @Column(name = "questions_id")
    private Long questionsId;
    private String text;
    @Column(name = "order_index")
    private Long orderIndex;


}
