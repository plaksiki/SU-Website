package com.example.demo.controller;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Survey;
import java.time.LocalDate;
import java.time.Month;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class SurveyController {
    @GetMapping("/survey/{id}")
    public Survey getSurvey(@PathVariable long id) {
        Survey survey = new Survey(id, "experimentalSurvey",
            "This survey is a check for me",
            LocalDate.of(2026, Month.JUNE, 18),
            LocalDate.of(2026, Month.JULY, 18)
        );
        return survey;
    }
}
