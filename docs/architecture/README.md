# Architecture Documentation

## Overview

This document describes the architecture of the Student Union Website, including **static view**, **dynamic view**, and ****deployment view.

## Static View

### Component Diagram

### What the Diagram Shows


### Coupling and Cohesion


### Maintainability Implications

**Strengths:**

**Constraints:**

### Quality Requirements Supported or Constrained

**Supported:**

**Constrained:**

## Dynamic View

### Sequence Diagrams

**Survey Participation Flow**: The diagram show full sequence of users interactions with 'Polls' page and surveys.

**Importance**: Surveys are created by admins and serves as the channel between students and SU members. With surveys on the public webpage it will be easier to collect feedback and to export it forward as diagrams.

**Architecture decisions, integration boundaries, quality requirements**:

- Client-side validation of unanswered questions provides immediate feedback, reduces server load and improves user experience
- QR-5: Text on page does not slide when user change the language during the survey
- QR-6: A student fills out and submits a questionnaire, then answers are given to backend, user sees confirmation.

<img width="1882" height="2447" alt="user-survey-sequence-diagram" src="https://github.com/user-attachments/assets/431aa8f8-37c6-479f-924d-97a7dd13e7cb" />


```plantuml
@startuml Dynamic view 1
title Sequence Diagram - User Completing a Survey

actor "User" as User
boundary "UI Layer (React)" as UI
control "API Gateway" as Gateway
control "Survey Service" as Survey
control "Response Service" as Response
database "PostgreSQL" as DB

== View Available Surveys ==
User -> UI: Navigate to Surveys page
UI -> Gateway: GET /api/surveys
Gateway -> Survey: Forward request
Survey -> DB: SELECT * FROM surveys WHERE is_active = true
DB --> Survey: Return list of active surveys
Survey --> Gateway: Return survey list (200 OK)
Gateway --> UI: Return 200 OK with survey list
UI --> User: Display all available surveys

== Select a Survey ==
User -> UI: Click on a survey card
UI -> Gateway: GET /api/surveys/{surveyId}/questions
Gateway -> Survey: Forward request
Survey -> DB: SELECT * FROM questions WHERE survey_id = {surveyId}
DB --> Survey: Return question list with options
Survey --> Gateway: Return questions with options (200 OK)
Gateway --> UI: Return 200 OK with question data
UI --> User: Display survey questions with form

== Fill Out Survey ==
User -> UI: Select option for Question 1
UI -> UI: Store answer locally (temporary state)

User -> UI: Select option for Question 2 (multiple choice)
UI -> UI: Store answer locally

User -> UI: Fill text answer for Question 3
UI -> UI: Store answer locally

== Attempt to Submit Without Completing All Questions ==
User -> UI: Click "Submit" button
UI -> UI: Validate all questions have answers
alt Some required questions unanswered
    UI -> UI: Identify unanswered required questions
    UI -> UI: Highlight unanswered questions in red
    UI --> User: Display error: "This field is required"
    note right: User must complete all\nsingle/multiple choice questions
end

== Complete All Questions and Submit ==
User -> UI: Answer remaining question
UI -> UI: Validate all required questions answered

User -> UI: Click "Submit" button
UI -> UI: Perform final validation (all questions answered)

UI -> Gateway: POST /api/responses
note right: Request body:\n{\n  surveyId: {id},\n  answers: {\n    questionId: selectedOptionId,\n    ...\n  }\n}

Gateway -> Response: Forward response data
Response -> DB: INSERT INTO responses (survey_id, question_id, option_id, answer_text, created_at)
DB --> Response: Return success (inserted response ID)
Response --> Gateway: Return 201 Created
Gateway --> UI: Return 201 Created

UI -> UI: Clear local answer state
UI --> User: Display "Thank you! Response submitted." with "Back to Polls" button

== Back to Surveys (Option 1: From Thank You Page) ==
User -> UI: Click "Back to Polls" button
UI -> Gateway: GET /api/surveys
Gateway -> Survey: Forward request
Survey -> DB: SELECT * FROM surveys WHERE is_active = true
DB --> Survey: Return list of active surveys
Survey --> Gateway: Return survey list (200 OK)
Gateway --> UI: Return 200 OK with survey list
UI --> User: Display all available surveys

== Back to Surveys (Option 2: From Survey Page) ==
User -> UI: Click "Back" button (while in survey)
UI -> UI: Clear local answer state
UI -> Gateway: GET /api/surveys
Gateway -> Survey: Forward request
Survey -> DB: SELECT * FROM surveys WHERE is_active = true
DB --> Survey: Return list of active surveys
Survey --> Gateway: Return survey list (200 OK)
Gateway --> UI: Return 200 OK with survey list
UI --> User: Display all available surveys

@enduml
```

**Diagram helps to understand** what system of Polls page approximately looks like inside, how it handles situation where user did not fill the form fully (ignored 'prepared choice questions'), how it saves the given answers.

## Deployment View

### Deployment Diagram


### Infrastructure Overview

[Explain deployment nodes and environments]

### Environment Configuration
- **Development**: [Configured for local testing]
- **Staging**: [Mirrors production]
- **Production**: [Live deployment]

### Scaling Considerations
[Discuss scaling approach and limitations]

## Architecture Decisions
For detailed decisions, see the Architecture Decision Records (ADRs) in `docs/architecture/adr/`.

## Revision History
| Date | Version | Changes | Author | Related ADR |
|------|---------|---------|--------| --------|
| 2026-06-30 | 1.0 | Initial architecture documentation | bilidjinka | - |
