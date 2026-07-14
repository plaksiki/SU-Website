package com.example.demo.polls.model;

public class AnswerExportModel {

    private Long answerNumber;
    private String question;
    private String answer;


    public AnswerExportModel(Long answerNumber, String question, String answer) {
        this.answerNumber = answerNumber;
        this.question = question;
        this.answer = answer;
    }


    public Long getAnswerNumber() {
        return answerNumber;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }
}