CREATE TABLE property_amenity_mapping (
    property_id BIGINT REFERENCES properties(property_id),
    amenity_id BIGINT REFERENCES property_amenities(amenity_id),
    PRIMARY KEY (property_id, amenity_id)
);