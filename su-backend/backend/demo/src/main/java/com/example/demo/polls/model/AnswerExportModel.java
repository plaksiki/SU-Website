package com.example.demo.polls.model;

public class AnswerExportModel {

    private Long responseId;
    private String question;
    private String answer;
    private Long orderIndex;

    public AnswerExportModel(Long responseId,
                             String question,
                             String answer,
                             Long orderIndex) {
        this.responseId = responseId;
        this.question = question;
        this.answer = answer;
        this.orderIndex = orderIndex;
    }

    public Long getResponseId() {
        return responseId;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public Long getOrderIndex() {
        return orderIndex;
    }
}