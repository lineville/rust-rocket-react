#![feature(proc_macro_hygiene, decl_macro)]

use rocket::http::Method;
use rocket::{get, routes, Response, StatusCode};
use rocket_cors;
use rocket_cors::{AllowedHeaders, AllowedOrigins, Error};

extern crate rocket;

extern crate diesel;
extern crate rust_web_app;

use self::diesel::prelude::*;
use self::models::*;
use self::rust_web_app::*;

// * Starts rocket web server
fn main() -> Result<(), Error> {
  // * Handles CORS
  let allowed_origins = AllowedOrigins::some_exact(&["http://localhost:3000/"]);

  let cors = rocket_cors::CorsOptions {
    allowed_origins,

    allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
    allowed_headers: AllowedHeaders::all(),
    allow_credentials: true,
    ..Default::default()
  }
  .to_cors()?;
  rocket::ignite()
    .mount("/", routes![index, puppies])
    .attach(cors)
    .launch();

  Ok(())
}

#[get("/")]
fn index() -> &'static str {
  "root"
}

#[get("/puppies")]
fn puppies() -> Response<'static> {
  let pups = fetch_five_puppies();
  // * Print out all the puppies the database gave us
  let mut res = Response::new();
  res.set_status(StatusCode::OK);
  let mut body = String::from("Puppies\n");
  for pup in pups {
    let pup = format!("{}: Name: {}, Breed: {}\n", pup.id, pup.name, pup.breed);
    body.push_str(&pup);
  }
  return response;
}

fn fetch_five_puppies() -> Vec<Puppy> {
  use rust_web_app::schema::puppies::dsl::*;

  let connection = establish_connection();
  // * Fetch 5 puppies from the puppies table using the connection
  let results = puppies
    .limit(5)
    .load::<Puppy>(&connection)
    .expect("Error loading puppies");
  return results;
}
