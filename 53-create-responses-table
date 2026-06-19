CREATE TABLE responses (
    id SERIAL PRIMARY KEY,
    questionnaire_id INTEGER NOT NULL REFERENCES questionnaires(id) ON DELETE CASCADE,
    submitted_at TIMESTAMP DEFAULT NOW()
);
