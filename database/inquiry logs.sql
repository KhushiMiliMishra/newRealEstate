CREATE TABLE inquiry_logs (
    inquiry_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT,
    customer_id BIGINT,
    agent_id BIGINT
);