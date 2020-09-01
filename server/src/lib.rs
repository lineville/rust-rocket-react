// * Diesel ORM
pub mod models;
pub mod schema;

#[macro_use]
extern crate diesel;
extern crate dotenv;

use self::models::{NewPuppy, Puppy};
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

// * Establishes a connection to postgres database (or throws error)
pub fn establish_connection() -> PgConnection {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

// * Creates a new puppy in the database with name and breed
pub fn create_puppy<'a>(conn: &PgConnection, name: &'a str, breed: &'a str) -> Puppy {
    use schema::puppies;
    let new_pup = NewPuppy {
        name: name,
        breed: breed,
    };

    diesel::insert_into(puppies::table)
        .values(&new_pup)
        .get_result(conn)
        .expect("Error saving new pup")
}

// * Updates a puppy in the database with new fields
pub fn update_puppy<'a>(
    conn: &PgConnection,
    _id: &'a i32,
    _name: &'a str,
    _breed: &'a str,
) -> Puppy {
    use schema::puppies::dsl::*;
    diesel::update(puppies.find(id))
        .set(name.eq(name))
        .get_result::<Puppy>(conn)
        .expect(&format!("Unable to find post {:?}", id))
}
