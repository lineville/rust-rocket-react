use crate::db::Conn;
use crate::logic;
use crate::models::owner::NewOwner;
use rocket_contrib::json::{Json, JsonValue};

#[get("/owners")]
pub fn get_owners(conn: Conn) -> JsonValue {
  json!(logic::owners::get_owners(&conn))
}

#[post("/owners", format = "json", data = "<owner>")]
pub fn create_owner(owner: Json<NewOwner>, conn: Conn) -> JsonValue {
  json!(logic::owners::create_owner(&conn, owner.into_inner()))
}
