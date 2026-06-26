package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "questionnaire_id")
    private long questionnaireId;

    private String text;

    @Column(name = "question_type")
    private String questionType;

    @Column(name = "order_index")
    private int orderIndex;

    @OneToMany(mappedBy = "questionId", cascade = CascadeType.ALL)
    private List<Option> options;

    public long getId() { return id; }
    public String getText() { return text; }
    public String getQuestionType() { return questionType; }
    public int getOrderIndex() { return orderIndex; }
    public List<Option> getOptions() { return options; }
}