extern crate diesel;
extern crate rust_web_app;

use self::rust_web_app::*;
use std::env::args;
use std::io::stdin;

fn main() {
  let connection = establish_connection();

  let id = args()
    .nth(1)
    .expect("publish_post requires a post id")
    .parse::<i32>()
    .expect("Invalid ID");

  println!("What would you like your pup's new name to be?");

  let mut name = String::new();
  stdin().read_line(&mut name).unwrap();
  let name = &name[..(name.len() - 1)]; // Drop the newline character

  println!("What would you like your pup's new breed to be?");

  let mut breed = String::new();
  stdin().read_line(&mut breed).unwrap();
  let breed = &breed[..(breed.len() - 1)]; // Drop the newline character

  let pup = update_puppy(&connection, &id, name, breed);
  println!("\nSaved pup {}, breed: {} with id {}", name, breed, pup.id);
}
