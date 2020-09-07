mod common;

use common::*;
use rocket::http::{ContentType, Status};

const API_PATH: &'static str = "/api/puppies";

#[test]
fn test_get_puppies() {
  let client = test_client();
  // * Creating one pup in db incase it is empty
  let millie = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "name": "Millie",
      "breed": "Golden",
      "age": 2
    }))
    .dispatch();
  let response = &mut client.get(API_PATH).dispatch();
  let value = response_json_value(response);
  assert_eq!(value.as_array().unwrap().len() > 0, true);
  // * Clean up
  client
    .delete(format!(
      "{}/{}",
      API_PATH,
      response_json_value(millie).get("id").unwrap()
    ))
    .dispatch();
}

#[test]
fn test_get_puppies_paginated() {
  let client = test_client();
  let skip = 0;
  let take = 3;
  let response = &mut client
    .get(format!("{}?skip={}&take={}", API_PATH, skip, take))
    .dispatch();
  let value = response_json_value(response);
  assert_eq!(value.as_array().unwrap().len(), 3);
}

#[test]
fn test_get_puppy() {
  let client = test_client();
  // * Creating one pup to make sure it can be fetched
  let response = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "name": "Millie",
      "breed": "Golden",
      "age": 2
    }))
    .dispatch();

  let millie = response_json_value(response);

  // * Try to fetch the one with the id we just created
  let response = &mut client
    .get(format!("{}/{}", API_PATH, millie.get("id").unwrap()))
    .dispatch();
  let value = response_json_value(response);
  assert_eq!(value.get("id"), millie.get("id"));

  // * Clean up
  client
    .delete(format!("{}/{}", API_PATH, value.get("id").unwrap()))
    .dispatch();
}

#[test]
fn test_create_puppy() {
  let client = test_client();
  let response = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "name": "NEWPUPNAME",
      "breed": "NEWPUPBREED",
      "age": 2
    }))
    .dispatch();
  let value = response_json_value(response);
  assert_eq!(value.get("name").unwrap(), "NEWPUPNAME");
  assert_eq!(value.get("breed").unwrap(), "NEWPUPBREED");
  assert_eq!(response.status(), Status::Ok);

  // * Clean up
  client
    .delete(format!("{}/{}", API_PATH, value.get("id").unwrap()))
    .dispatch();
}

#[test]
fn test_update_puppy() {
  let client = test_client();
  // * Creating a pup to update incase one doesn't exist
  let new_pup = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "name": "pup",
      "breed": "breed",
      "age": 1
    }))
    .dispatch();

  let value = response_json_value(new_pup);

  let response = &mut client
    .put(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "id": value.get("id").unwrap(),
      "name": "NEWPUPNAME",
      "breed": "NEWPUPBREED",
      "age": 5
    }))
    .dispatch();

  let value = response_json_value(response);
  assert_eq!(value.get("name").unwrap(), "NEWPUPNAME");
  assert_eq!(value.get("breed").unwrap(), "NEWPUPBREED");
  assert_eq!(value.get("age").unwrap(), 5);
  assert_eq!(response.status(), Status::Ok);

  // * Clean up
  client
    .delete(format!("{}/{}", API_PATH, value.get("id").unwrap()))
    .dispatch();
}

#[test]
fn test_delete_puppy() {
  let client = test_client();

  let new_pup = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "name": "NEWPUPNAME",
      "breed": "NEWPUPBREED",
      "age": 2
    }))
    .dispatch();

  let value = response_json_value(new_pup);
  let response = &mut client
    .delete(format!("{}/{}", API_PATH, value.get("id").unwrap()))
    .dispatch();
  assert_eq!(response.status(), Status::Ok);
}
