use crate::models::puppy::{NewPuppy, Puppy};
use rocket_contrib::json::{Json, JsonValue};

use crate::db;
use crate::middleware;

#[get("/")]
pub fn index() -> &'static str {
  "root"
}

#[get("/puppies")]
pub fn all_puppies(conn: db::Conn) -> JsonValue {
  json!(middleware::puppies::get_puppies(&conn))
}

#[get("/puppies?<skip>&<take>")]
pub fn puppies_paginated(skip: u32, take: u32, conn: db::Conn) -> JsonValue {
  json!(middleware::puppies::get_puppies_paginated(
    skip, take, &conn
  ))
}

#[get("/puppies/<id>")]
pub fn puppies(id: i32, conn: db::Conn) -> JsonValue {
  json!(middleware::puppies::get_puppy(id, &conn))
}

#[post("/puppies", format = "json", data = "<puppy>")]
pub fn create_puppy(puppy: Json<NewPuppy>, conn: db::Conn) -> JsonValue {
  json!(middleware::puppies::create_puppy(&conn, puppy.into_inner()))
}

#[put("/puppies", format = "json", data = "<puppy>")]
pub fn update_puppy(puppy: Json<Puppy>, conn: db::Conn) -> JsonValue {
  json!(middleware::puppies::update_puppy(&conn, puppy.into_inner()))
}

#[delete("/puppies/<id>")]
pub fn delete_puppy(id: i32, conn: db::Conn) -> JsonValue {
  json!({ "success": middleware::puppies::delete_puppy(&conn, &id) })
}
