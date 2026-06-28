INSERT INTO questionnaires (title, description) VALUES 
    ('Опрос студсовета', 'Расскажите о вашем опыте в студсовете'),
    ('Мероприятия', 'Какие мероприятия вам нравятся?');

INSERT INTO questions (questionnaire_id, text, question_type, order_index) VALUES 
    (1, 'Как вы оцениваете работу студсовета?', 'single_choice', 1),
    (1, 'Что нужно улучшить?', 'single_choice', 2),
    (2, 'Какое мероприятие вам нравится больше всего?', 'single_choice', 1);

INSERT INTO options (question_id, text, order_index) VALUES 
    (1, 'Отлично', 1),
    (1, 'Хорошо', 2),
    (1, 'Удовлетворительно', 3),
    (1, 'Плохо', 4),
    (2, 'Коммуникация', 1),
    (2, 'Мероприятия', 2),
    (2, 'Обратная связь', 3),
    (3, 'Кино', 1),
    (3, 'Прогулка в парке', 2),
    (3, 'Квест', 3);

INSERT INTO responses (questionnaire_id, submitted_at) VALUES 
    (1, NOW() - INTERVAL '2 days'),
    (1, NOW() - INTERVAL '1 day'),
    (2, NOW());

INSERT INTO answers (response_id, question_id, option_id) VALUES 
    (1, 1, 1),
    (1, 2, 5),
    (2, 1, 2),
    (2, 2, 6),
    (3, 3, 8);