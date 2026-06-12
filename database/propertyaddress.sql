CREATE TABLE property_address (
    address_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT REFERENCES properties(property_id),
    address_line TEXT,
    locality VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8)
);