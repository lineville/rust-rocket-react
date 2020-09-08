#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

#[macro_use]
extern crate diesel;

use dotenv::dotenv;

mod config;
mod db;
mod logic;
pub mod models;
mod routes;
mod schema;

// * Wire up the config, mount all the endpoints, attach fairings and verify environment
pub fn rocket() -> rocket::Rocket {
  dotenv().ok();
  rocket::custom(config::from_env())
    .mount(
      "/api",
      routes![
        routes::puppies::all_puppies,
        routes::puppies::puppies_paginated,
        routes::puppies::puppies,
        routes::puppies::create_puppy,
        routes::puppies::update_puppy,
        routes::puppies::delete_puppy,
        routes::owners::get_owners,
        routes::owners::create_owner
      ],
    )
    .attach(db::Conn::fairing())
    .attach(config::cors_fairing())
    .attach(config::AppState::manage())
    .register(catchers![routes::puppies::not_found])
}
