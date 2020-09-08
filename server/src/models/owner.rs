use crate::schema::owners;
use serde_derive::{Deserialize, Serialize};
use typescript_definitions::TypeScriptify;

#[derive(Queryable, Identifiable, AsChangeset, Serialize, Deserialize, TypeScriptify)]
#[table_name = "owners"]
pub struct Owner {
  pub id: i32,
  pub first_name: String,
  pub last_name: String,
}

#[derive(Insertable, Deserialize, TypeScriptify)]
#[table_name = "owners"]
pub struct NewOwner<'a> {
  pub first_name: &'a str,
  pub last_name: &'a str,
}
