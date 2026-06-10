CREATE TABLE admin_profiles (
    admin_id BIGINT PRIMARY KEY,
    department VARCHAR(100),
    FOREIGN KEY (admin_id) REFERENCES users(user_id)
);