use crate::schema::puppies;
use serde_derive::{Deserialize, Serialize};
use typescript_definitions::TypeScriptify;

#[derive(Queryable, Identifiable, AsChangeset, Serialize, Deserialize, TypeScriptify)]
#[table_name = "puppies"]
pub struct Puppy {
  pub id: i32,
  pub name: String,
  pub breed: String,
}

#[derive(Insertable, Deserialize)]
#[table_name = "puppies"]
pub struct NewPuppy<'a> {
  pub name: &'a str,
  pub breed: &'a str,
}
