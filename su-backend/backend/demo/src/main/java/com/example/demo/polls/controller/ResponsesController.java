package com.example.demo.polls.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.polls.entity.Responses;
import com.example.demo.polls.repository.ResponsesRepository;
import com.opencsv.CSVWriter;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class ResponsesController {
    private final ResponsesRepository repository;

    public ResponsesController (ResponsesRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/responses/{id}")
    public Optional<Responses> getResponses(@PathVariable Long id) {
        return repository.findById(id);
    }
    @PostMapping("/responses")
    public Responses createResponse(@RequestBody Responses entity) {
        entity.setSubmittedAt(LocalDateTime.now());
        return repository.save(entity);
    }
    @GetMapping("/responses")
    public List<Responses> getAllResponses() {
        return repository.findAll();
    }
    @GetMapping("/responses/csv/{questionnaireId}")
    public void getResponsesCsvByQuestionnaireId(
            @PathVariable Long questionnaireId,
            HttpServletResponse response) throws IOException, CsvDataTypeMismatchException, CsvRequiredFieldEmptyException {

        List<Responses> responses = repository.findByQuestionnaireId(questionnaireId);
        if (responses.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            response.getWriter().write("No responses found for questionnaire ID: " + questionnaireId);
            return;
        }
        response.setContentType("text/csv");
        String filename = "responses_questionnaire_" + questionnaireId + ".csv";
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + filename + "\"");

        StatefulBeanToCsv<Responses> writer = new StatefulBeanToCsvBuilder<Responses>(response.getWriter())
                .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                .build();
        writer.write(responses);
    }
}
