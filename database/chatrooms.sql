CREATE TABLE chat_rooms (
    room_id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT,
    agent_id BIGINT,
    property_id BIGINT,
    messages_json JSONB
);