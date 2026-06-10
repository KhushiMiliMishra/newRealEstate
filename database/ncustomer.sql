CREATE TABLE customer_profiles (
    customer_id BIGINT PRIMARY KEY,
    budget_min DECIMAL(12,2),
    budget_max DECIMAL(12,2),
    preferred_locality VARCHAR(100),
    preferred_property_type VARCHAR(50),
    transaction_type VARCHAR(20),
    saved_search_1 TEXT,
    saved_search_2 TEXT,
    saved_search_3 TEXT,
    FOREIGN KEY (customer_id) REFERENCES users(user_id)
);