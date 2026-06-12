CREATE TABLE properties (
    property_id BIGSERIAL PRIMARY KEY,

    agent_id BIGINT REFERENCES agent_profiles(agent_id),

    title VARCHAR(255) NOT NULL,
    description TEXT,

    property_type VARCHAR(50),
    transaction_type VARCHAR(20),

    price DECIMAL(12,2),

    bhk INT,
    bathrooms INT,
    balconies INT,

    area_sqft INT,

    floor_no INT,
    total_floors INT,

    furnishing_status VARCHAR(50),

    property_age INT,

    listing_status VARCHAR(30),

    property_status VARCHAR(20),

    image_1 TEXT,
    image_2 TEXT,
    image_3 TEXT,
    image_4 TEXT,
    image_5 TEXT,

    video_url TEXT,
    floor_plan_url TEXT,
    virtual_tour_url TEXT
);