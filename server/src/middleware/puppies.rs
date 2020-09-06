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

// * Gets all the puppies, limited amount or default 20
pub fn get_puppies_limited(limit: Option<u8>, conn: &PgConnection) -> Vec<Puppy> {
  db::puppies::get_puppies_limited(limit, conn)
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
