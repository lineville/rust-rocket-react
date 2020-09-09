use crate::models::owner::{NewOwner, Owner};
use crate::models::puppy::Puppy;
use crate::schema::owners::dsl::*;
use diesel;
use diesel::pg::PgConnection;
use diesel::prelude::*;

// * Get all the owners
pub fn get_owners(conn: &PgConnection) -> Vec<Owner> {
  let result = owners
    .order(id.asc())
    .load::<Owner>(conn)
    .expect("Error loading owners");
  return result;
}

// * Create a new owner
pub fn create_owner<'a>(conn: &PgConnection, owner: NewOwner) -> Owner {
  diesel::insert_into(owners)
    .values(&owner)
    .get_result(conn)
    .expect("Error creating owner")
}

// * Gets owners and their puppies
pub fn get_owners_and_puppies(conn: &PgConnection) -> Vec<(Vec<Puppy>, Owner)> {
  let result = get_owners(conn);
  let pups = Puppy::belonging_to(&result)
    .load::<Puppy>(conn)
    .expect("Error loading pups")
    .grouped_by(&result);
  let data = pups.into_iter().zip(result).collect::<Vec<_>>();
  return data;
}
