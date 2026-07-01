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

    public Options() {
        this.text = "default";
    }

    public Options(Long id, Long questionsId, String text, Long orderIndex) {
        this.id = id;
        this.questionsId = questionsId;
        this.text = text;
        this.orderIndex = orderIndex;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionsId() {
        return this.questionsId;
    }

    public void setQuestionsId(Long questionsId) {
        this.questionsId = questionsId;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getOrderIndex() {
        return this.orderIndex;
    }

    public void setOrderIndex(Long orderIndex) {
        this.orderIndex = orderIndex;
    }

}
