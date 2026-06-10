CREATE TABLE price_alerts (
    alert_id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT,
    property_id BIGINT,
    target_price DECIMAL(12,2)
);