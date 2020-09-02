use rocket_contrib::databases::diesel;
extern crate dotenv;

pub mod puppies;

#[database("diesel_postgres_pool")]
pub struct Conn(diesel::PgConnection);
