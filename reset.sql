DROP TABLE IF EXISTS concert_lineup CASCADE;
DROP TABLE IF EXISTS concert CASCADE;
DROP TABLE IF EXISTS artist CASCADE;


-- -- Table for storing artist information
-- CREATE TABLE artist (
--     artist_id SERIAL PRIMARY KEY,
--     artist_name VARCHAR(100) UNIQUE NOT NULL
-- );

-- -- Table for storing concert information
-- CREATE TABLE concert (
--     concert_id SERIAL PRIMARY KEY,
--     concert_date DATE NOT NULL,
--     venue VARCHAR(100) NOT NULL
-- );

-- -- Enum type for roles
-- CREATE TYPE CONCERT_ROLE AS ENUM ('headliner', 'support', 'opener');

-- -- Table for storing concert lineup with roles using the enum type
-- CREATE TABLE concert_lineup (
--     concert_id INT REFERENCES concert(concert_id),
--     artist_id INT REFERENCES artist(artist_id),
--     role CONCERT_ROLE,
--     PRIMARY KEY (concert_id, artist_id, role)
-- );