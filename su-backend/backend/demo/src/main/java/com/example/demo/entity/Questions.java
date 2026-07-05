package com.example.demo.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "questions")
public class Questions {
    @Id
    private Long id;
    @Column(name = "questionnaire_id")
    private Long questionnaireId;
    private String text;
    @Column(name = "question_type")
    private String questionType;
    @Column(name = "order_index")
    private Long orderIndex;

    public Questions() {
        this.text = "default";
    }

    public Questions(Long id, Long questionnaireId, String text, String questionType, Long orderIndex) {
        this.id = id;
        this.questionnaireId = questionnaireId;
        this.text = text;
        this.questionType = questionType;
        this.orderIndex = orderIndex;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuestionnaireId() {
        return this.questionnaireId;
    }

    public void setQuestionnaireId(Long questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getQuestionType() {
        return this.questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public Long getOrderIndex() {
        return this.orderIndex;
    }

    public void setOrderIndex(Long orderIndex) {
        this.orderIndex = orderIndex;
    }
}
