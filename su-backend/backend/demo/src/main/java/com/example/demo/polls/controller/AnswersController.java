package com.example.demo.polls.controller;

import com.example.demo.polls.entity.Answers;
import com.example.demo.polls.entity.Options;
import com.example.demo.polls.entity.Questions;
import com.example.demo.polls.repository.AnswersRepository;
import com.example.demo.polls.repository.OptionsRepository;
import com.example.demo.polls.repository.QuestionsRepository;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import com.opencsv.CSVWriter;


@RestController
public class AnswersController {

    private final AnswersRepository answersRepository;
    private final QuestionsRepository questionsRepository;
    private final OptionsRepository optionsRepository;


    public AnswersController(
            AnswersRepository answersRepository,
            QuestionsRepository questionsRepository,
            OptionsRepository optionsRepository) {

        this.answersRepository = answersRepository;
        this.questionsRepository = questionsRepository;
        this.optionsRepository = optionsRepository;
    }


    @GetMapping("/answers/{id}")
    public Optional<Answers> getAnswer(@PathVariable Long id) {
        return answersRepository.findById(id);
    }


    @PostMapping("/answers")
    public Answers createAnswer(@RequestBody Answers entity) {
        return answersRepository.save(entity);
    }


    @GetMapping("/answers")
    public List<Answers> getAllAnswers() {
        return answersRepository.findAll();
    }


    @GetMapping("/answers/csv/{questionnaireId}")
    public void exportAnswers(
            @PathVariable Long questionnaireId,
            HttpServletResponse response
    ) throws IOException {
        response.setContentType("text/csv");
        response.setCharacterEncoding("UTF-8");
        response.setHeader(
            HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"questionnaire_" + questionnaireId + ".csv\""
        );
        response.getWriter().write('\uFEFF');

        CSVWriter writer = new CSVWriter(response.getWriter());
        writer.writeNext(new String[]{
                "Response ID",
                "Question",
                "Answer"
        });
        List<Answers> answers = answersRepository.findAll();
        for (Answers answer : answers) {
            Questions question = questionsRepository.findById(answer.getQuestionId()).orElse(null);
            if (question == null) {
                continue;
            }
            if (!question.getQuestionnaireId().equals(questionnaireId)) {
                continue;
            }
            String answerText;
            if (answer.getOptionId() != null) {
                Options option = optionsRepository.findById(answer.getOptionId()) .orElse(null);
                answerText = option != null ? option.getText() : "";
            } else {
                answerText = answer.getTextAnswer() != null ? answer.getTextAnswer() : "";
            }
            writer.writeNext(new String[]{
                    String.valueOf(answer.getResponseId()),
                    question.getText(),
                    answerText
            });
        }
        writer.close();
    }
}