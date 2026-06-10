CREATE TABLE IF NOT EXISTS recently_viewed (
    view_id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT,
    property_id BIGINT,
    CONSTRAINT fk_recent_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer_profiles(customer_id),
    CONSTRAINT fk_recent_property
        FOREIGN KEY (property_id)
        REFERENCES properties(property_id)
);