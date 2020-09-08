-- This file should undo anything in `up.sql`

ALTER TABLE puppies
DROP COLUMN owner_id;


DROP TABLE owners;