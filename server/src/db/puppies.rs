use crate::models::puppy::{NewPuppy, Puppy};
use crate::schema::puppies::dsl::*;
use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;

// * Gets all the puppies
pub fn get_puppies(conn: &PgConnection) -> Vec<Puppy> {
  let results = puppies
    .order(id.asc())
    .load::<Puppy>(conn)
    .expect("Error loading puppies");
  return results;
}

// * Gets all the puppies, limited amount or default 20
pub fn get_puppies_limited(limit: Option<u8>, conn: &PgConnection) -> Vec<Puppy> {
  let results = puppies
    .limit(match limit {
      Some(limit) => limit.into(),
      None => 20,
    })
    .load::<Puppy>(conn)
    .expect("Error loading puppies");
  return results;
}

// * Creates a new puppy in the database with name and breed
pub fn create_puppy<'a>(conn: &PgConnection, pup: NewPuppy) -> Puppy {
  diesel::insert_into(puppies)
    .values(&pup)
    .get_result(conn)
    .expect("Error saving new pup")
}

// * Updates a puppy in the database with new fields
pub fn update_puppy<'a>(conn: &PgConnection, pup: Puppy) -> Puppy {
  diesel::update(puppies.filter(id.eq(pup.id)))
    .set(pup)
    .get_result::<Puppy>(conn)
    .expect(&format!("Unable to find post {:?}", id))
}

// * Deletes a puppy with the given id (maybe change output type)
pub fn delete_puppy<'a>(conn: &PgConnection, pup_id: &'a i32) -> bool {
  let deleted_puppy = diesel::delete(puppies.filter(id.eq(pup_id))).get_result::<Puppy>(conn);

  match deleted_puppy {
    Ok(_puppy) => true,
    Err(_) => false,
  }
}
