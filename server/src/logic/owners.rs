use crate::db;
use crate::models::owner::{NewOwner, Owner};
use diesel::pg::PgConnection;

// * Gets all the owners
pub fn get_owners(conn: &PgConnection) -> Vec<Owner> {
  db::owners::get_owners(conn)
}

// * Creates a new owner
pub fn create_owner<'a>(conn: &PgConnection, owner: NewOwner) -> Owner {
  db::owners::create_owner(conn, owner)
}