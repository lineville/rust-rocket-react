use crate::models::owner::Owner;
use crate::schema::puppies;
use serde_derive::{Deserialize, Serialize};
use typescript_definitions::TypeScriptify;

#[derive(
  Queryable, Identifiable, AsChangeset, Serialize, Deserialize, TypeScriptify, Associations, Clone,
)]
#[belongs_to(Owner)]
#[table_name = "puppies"]
pub struct Puppy {
  pub id: i32,
  pub name: String,
  pub breed: String,
  pub age: i32,
  pub owner_id: Option<i32>,
}

#[derive(Insertable, Deserialize, TypeScriptify)]
#[table_name = "puppies"]
pub struct NewPuppy<'a> {
  pub name: &'a str,
  pub breed: &'a str,
  pub age: i32,
  pub owner_id: Option<i32>,
}
