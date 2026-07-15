CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
	event_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	finished_at TIMESTAMP
);

ALTER TABLE events
ADD COLUMN event_location TEXT;
