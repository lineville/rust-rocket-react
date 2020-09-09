use crate::db;
use crate::models::owner::{NewOwner, Owner, OwnerWithPuppies};
use diesel::pg::PgConnection;

// * Gets all the owners
pub fn get_owners(conn: &PgConnection) -> Vec<Owner> {
  db::owners::get_owners(conn)
}

// * Creates a new owner
pub fn create_owner<'a>(conn: &PgConnection, owner: NewOwner) -> Owner {
  db::owners::create_owner(conn, owner)
}

// * Gets all the owners and their puppies
pub fn get_owners_and_puppies(conn: &PgConnection) -> Vec<OwnerWithPuppies> {
  db::owners::get_owners_and_puppies(conn)
    .iter()
    .map(|(pups, owner)| OwnerWithPuppies {
      id: owner.id,
      first_name: owner.first_name.clone(),
      last_name: owner.last_name.clone(),
      puppies: pups.to_owned().to_vec(),
    })
    .collect()
}
