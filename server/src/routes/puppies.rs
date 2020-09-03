use crate::models::puppy::{NewPuppy, Puppy};
use rocket_contrib::json::{Json, JsonValue};

use crate::db;

#[get("/")]
pub fn index() -> &'static str {
  "root"
}

#[get("/puppies")]
pub fn all_puppies(conn: db::Conn) -> JsonValue {
  json!(db::puppies::get_puppies(&conn))
}

#[get("/puppies/<limit>")]
pub fn puppies(limit: Option<u8>, conn: db::Conn) -> JsonValue {
  json!(db::puppies::get_puppies_limited(limit, &conn))
}

#[post("/puppies", format = "json", data = "<puppy>")]
pub fn create_puppy(puppy: Json<NewPuppy>, conn: db::Conn) -> JsonValue {
  json!(db::puppies::create_puppy(&conn, puppy.into_inner()))
}

#[put("/puppies", format = "json", data = "<puppy>")]
pub fn update_puppy(puppy: Json<Puppy>, conn: db::Conn) -> JsonValue {
  json!(db::puppies::update_puppy(&conn, puppy.into_inner()))
}

#[delete("/puppies/<id>")]
pub fn delete_puppy(id: i32, conn: db::Conn) -> JsonValue {
  json!({ "success": db::puppies::delete_puppy(&conn, &id) })
}
