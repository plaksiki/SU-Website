package com.example.demo.polls.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.polls.entity.Answers;
import com.example.demo.polls.entity.Responses;
import com.example.demo.polls.model.AnswerExportModel;
import com.example.demo.polls.repository.AnswersRepository;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AnswersController {
    private final AnswersRepository repository;

    public AnswersController (AnswersRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/answers/{id}")
    public Optional<Answers> getOptions(@PathVariable Long id) {
        return repository.findById(id);
    }
    @PostMapping("/answers")
    public Answers createAnswer(@RequestBody Answers entity) {
        return repository.save(entity);
    }
    @GetMapping("/answers")
    public List<Answers> getAllAnswers() {
        return repository.findAll();
    }
    @GetMapping("/answers/csv/{questionnaireId}")
    public void exportAnswers(
            @PathVariable Long questionnaireId,
            HttpServletResponse response
    ) throws IOException {
        List<AnswerExportModel> answers =
                repository.exportAnswers(questionnaireId);

        response.setContentType("text/csv; charset=UTF-8");
        String filename =
                "questionnaire_" + questionnaireId + ".csv";

        response.setHeader(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + filename + "\""
        );
        CSVWriter writer =
                new CSVWriter(response.getWriter());
        writer.writeNext(new String[]{
                "Ответ #",
                "Вопрос",
                "Ответ"
        });
        for (AnswerExportModel answer : answers) {
            writer.writeNext(new String[]{
                    String.valueOf(answer.getAnswerNumber()),
                    answer.getQuestion(),
                    answer.getAnswer()
            });
        }
        writer.close();
    }
}