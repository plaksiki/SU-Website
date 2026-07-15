package com.example.demo.polls.controller;

import com.example.demo.polls.entity.Answers;
import com.example.demo.polls.entity.Options;
import com.example.demo.polls.entity.Questions;
import com.example.demo.polls.model.AnswerExportModel;
import com.example.demo.polls.repository.AnswersRepository;
import com.example.demo.polls.repository.OptionsRepository;
import com.example.demo.polls.repository.QuestionsRepository;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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

        List<AnswerExportModel> data = answersRepository.exportAnswers(questionnaireId);

        response.setContentType("text/csv");
        response.setCharacterEncoding("UTF-8");
        response.setHeader(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"questionnaire_" + questionnaireId + ".csv\""
        );

        response.getWriter().write('\uFEFF');

        CSVWriter writer = new CSVWriter(
                response.getWriter(),
                ';',
                CSVWriter.DEFAULT_QUOTE_CHARACTER,
                CSVWriter.DEFAULT_ESCAPE_CHARACTER,
                CSVWriter.DEFAULT_LINE_END
        );

        List<String> questions = new ArrayList<>();
        for (AnswerExportModel row : data) {
            if (!questions.contains(row.getQuestion())) {
                questions.add(row.getQuestion());
            }
        }

        List<String> header = new ArrayList<>();
        header.add("Answer");
        header.addAll(questions);
        writer.writeNext(header.toArray(new String[0]));

        Map<Long, Map<String, String>> responses = new LinkedHashMap<>();

        for (AnswerExportModel row : data) {
            responses.putIfAbsent(
                    row.getResponseId(),
                    new LinkedHashMap<>()
            );
            responses.get(row.getResponseId())
                    .put(row.getQuestion(), row.getAnswer());
        }

        for (Long responseId : responses.keySet()) {
            List<String> csvRow = new ArrayList<>();
            csvRow.add(String.valueOf(responseId));
            for (String question : questions) {
                csvRow.add(
                        responses.get(responseId)
                                .getOrDefault(question, "")
                );
            }
            writer.writeNext(csvRow.toArray(new String[0]));
        }

        writer.close();
}
}