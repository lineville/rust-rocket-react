-- Your SQL goes here
CREATE TABLE puppies
(
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  breed VARCHAR NOT NULL
)