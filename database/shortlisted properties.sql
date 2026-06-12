CREATE TABLE shortlisted_properties (
    shortlist_id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT REFERENCES customer_profiles(customer_id),
    property_id BIGINT REFERENCES properties(property_id)
);