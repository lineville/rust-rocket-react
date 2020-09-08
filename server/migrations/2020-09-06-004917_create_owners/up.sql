-- Your SQL goes here

CREATE TABLE owners (id SERIAL PRIMARY KEY,
                                       first_name VARCHAR NOT NULL,
                                                          last_name VARCHAR NOT NULL);


ALTER TABLE puppies ADD owner_id integer;


ALTER TABLE puppies ADD CONSTRAINT fk_owner
FOREIGN KEY(owner_id) REFERENCES owners(id)