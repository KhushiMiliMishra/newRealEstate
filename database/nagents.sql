CREATE TABLE agent_profiles (
    agent_id BIGINT PRIMARY KEY,
    agency_name VARCHAR(100),
    license_number VARCHAR(50),
    experience_years INT,
    office_address TEXT,
    verification_status VARCHAR(30),
    average_rating DECIMAL(3,2),
    total_reviews INT,
    available_days VARCHAR(100),
    available_time_from TIME,
    available_time_to TIME,
    FOREIGN KEY (agent_id) REFERENCES users(user_id)
);