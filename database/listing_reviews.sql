CREATE TABLE listing_reviews (
    review_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT,
    admin_id BIGINT,
    decision VARCHAR(30),
    reason TEXT
);