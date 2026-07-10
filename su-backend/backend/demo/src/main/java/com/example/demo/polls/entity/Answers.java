package com.example.demo.polls.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "answers")
public class Answers {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Column(name = "response_id")
    private Long responseId;
    @Column(name = "question_id")
    private Long questionId;
    @Column(name = "text_answer")
    private String textAnswer;
    @Column(name = "option_id")
    private Long optionId;

    public Answers() {
    }

    public Answers(Long id, Long responseId, Long questionId, String textAnswer, Long optionId) {
        this.id = id;
        this.responseId = responseId;
        this.questionId = questionId;
        this.textAnswer = textAnswer;
        this.optionId = optionId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getResponseId() {
        return this.responseId;
    }

    public void setResponseId(Long responseId) {
        this.responseId = responseId;
    }

    public Long getQuestionId() {
        return this.questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getTextAnswer() {
        return this.textAnswer;
    }

    public void setTextAnswer(String textAnswer) {
        this.textAnswer = textAnswer;
    }

    public Long getOptionId() {
        return this.optionId;
    }

    public void setOptionId(Long optionId) {
        this.optionId = optionId;
    }

}
