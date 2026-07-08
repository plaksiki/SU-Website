package com.example.demo.entity;
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
    private String text_answer;
    @Column(name = "option_id")
    private Long optionId;

    public Answers() {
    }

    public Answers(Long id, Long responseId, Long questionId, String text_answer, Long optionId) {
        this.id = id;
        this.responseId = responseId;
        this.questionId = questionId;
        this.text_answer = text_answer;
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

    public String getText_answer() {
        return this.text_answer;
    }

    public void setText_answer(String text_answer) {
        this.text_answer = text_answer;
    }

    public Long getOptionId() {
        return this.optionId;
    }

    public void setOptionId(Long optionId) {
        this.optionId = optionId;
    }

}
