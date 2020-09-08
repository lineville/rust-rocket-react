use crate::db::Conn;
use crate::logic;
use crate::models::puppy::{NewPuppy, Puppy};
use rocket_contrib::json::{Json, JsonValue};

#[get("/puppies")]
pub fn all_puppies(conn: Conn) -> JsonValue {
  json!(logic::puppies::get_puppies(&conn))
}

#[get("/puppies?<skip>&<take>")]
pub fn puppies_paginated(skip: u32, take: u32, conn: Conn) -> JsonValue {
  json!(logic::puppies::get_puppies_paginated(skip, take, &conn))
}

#[get("/puppies/<id>")]
pub fn puppies(id: i32, conn: Conn) -> JsonValue {
  json!(logic::puppies::get_puppy(id, &conn))
}

#[post("/puppies", format = "json", data = "<puppy>")]
pub fn create_puppy(puppy: Json<NewPuppy>, conn: Conn) -> JsonValue {
  json!(logic::puppies::create_puppy(&conn, puppy.into_inner()))
}

#[put("/puppies", format = "json", data = "<puppy>")]
pub fn update_puppy(puppy: Json<Puppy>, conn: Conn) -> JsonValue {
  json!(logic::puppies::update_puppy(&conn, puppy.into_inner()))
}

#[delete("/puppies/<id>")]
pub fn delete_puppy(id: i32, conn: Conn) -> JsonValue {
  json!({ "success": logic::puppies::delete_puppy(&conn, &id) })
}

// * Hitting the server directly will give a 404 (all routes are under /api)
#[catch(404)]
pub fn not_found() -> JsonValue {
  json!({
      "status": "error",
      "reason": "Resource was not found."
  })
}
