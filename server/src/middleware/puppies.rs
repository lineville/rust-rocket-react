// * Manager Layer which sits in between Rocket routes and DB transaction layer

// * Main business logic should occur here so that routes can simply handle routing to here
// * and the data access layer can be simply diesel conversions to db queries

use diesel::pg::PgConnection;

use crate::models::puppy::{NewPuppy, Puppy};

use crate::db;

// * Gets all the puppies
pub fn get_puppies(conn: &PgConnection) -> Vec<Puppy> {
  db::puppies::get_puppies(conn)
}

pub fn get_puppies_paginated(skip: u32, take: u32, conn: &PgConnection) -> Vec<Puppy> {
  db::puppies::get_puppies_paginated(skip, take, conn)
}

// * Gets puppy with the given id
pub fn get_puppy(id: i32, conn: &PgConnection) -> Puppy {
  db::puppies::get_puppy(id, conn)
}

// * Creates a new puppy in the database with name and breed
pub fn create_puppy<'a>(conn: &PgConnection, pup: NewPuppy) -> Puppy {
  db::puppies::create_puppy(conn, pup)
}

// * Updates a puppy in the database with new fields
pub fn update_puppy<'a>(conn: &PgConnection, pup: Puppy) -> Puppy {
  db::puppies::update_puppy(conn, pup)
}

// * Deletes a puppy with the given id (maybe change output type)
pub fn delete_puppy<'a>(conn: &PgConnection, pup_id: &'a i32) -> bool {
  db::puppies::delete_puppy(conn, pup_id)
}
