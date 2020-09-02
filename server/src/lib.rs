#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
use rocket_cors;

#[macro_use]
extern crate diesel;

use dotenv::dotenv;

mod config;
mod db;
pub mod models;
mod routes;
mod schema;

use rocket_contrib::json::JsonValue;
use rocket_cors::Cors;

#[catch(404)]
fn not_found() -> JsonValue {
  json!({
      "status": "error",
      "reason": "Resource was not found."
  })
}

fn cors_fairing() -> Cors {
  Cors::from_options(&Default::default()).expect("Cors fairing cannot be created")
}

pub fn rocket() -> rocket::Rocket {
  dotenv().ok();
  rocket::custom(config::from_env())
    .mount(
      "/api",
      routes![
        routes::puppies::index,
        routes::puppies::all_puppies,
        routes::puppies::puppies,
        routes::puppies::create_puppy,
        routes::puppies::update_puppy,
        routes::puppies::delete_puppy
      ],
    )
    .attach(db::Conn::fairing())
    .attach(cors_fairing())
    .attach(config::AppState::manage())
    .register(catchers![not_found])
}
