extern crate diesel;
extern crate rust_web_app;

use self::rust_web_app::*;
use std::io::stdin;

fn main() {
  let connection = establish_connection();

  println!("What would you like your pup's name to be?");
  let mut name = String::new();
  stdin().read_line(&mut name).unwrap();
  let name = &name[..(name.len() - 1)]; // Drop the newline character

  println!("What would you like your pup's breed to be?");

  let mut breed = String::new();
  stdin().read_line(&mut breed).unwrap();
  let breed = &breed[..(breed.len() - 1)]; // Drop the newline character

  let pup = create_puppy(&connection, name, breed);
  println!("\nSaved pup {}, breed: {} with id {}", name, breed, pup.id);
}
