CREATE TABLE viewing_requests (
    request_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT,
    customer_id BIGINT,
    agent_id BIGINT,
    requested_date DATE,
    requested_time TIME,
    status VARCHAR(30),
    notes TEXT
);