CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    response_id INTEGER NOT NULL REFERENCES responses(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_id INTEGER NOT NULL REFERENCES options(id) ON DELETE CASCADE,
	text_answer TEXT,	
    UNIQUE (response_id, question_id, option_id),
	CONSTRAINT answer_type_check CHECK (
        (option_id IS NOT NULL AND text_answer IS NULL) OR
        (option_id IS NULL AND text_answer IS NOT NULL)
    )
);
