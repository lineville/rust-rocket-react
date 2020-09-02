mod common;

use common::*;
use rocket::http::{ContentType, Status};

const API_PATH: &'static str = "/api/puppies";

#[test]
fn test_get_puppies() {
  let client = test_client();
  let response = &mut client.get(API_PATH).dispatch();
  let value = response_json_value(response);
  assert_eq!(value.as_array().unwrap().len() > 0, true);
}

#[test]
fn test_get_puppies_limit() {
  let client = test_client();
  let response = &mut client.get(format!("{}/{}", API_PATH, 1)).dispatch();
  let value = response_json_value(response);
  assert_eq!(value.as_array().unwrap().len(), 1);
}

#[test]
fn test_create_puppy() {
  let client = test_client();
  let response = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "name": "NEWPUPNAME",
      "breed": "NEWPUPBREED"
    }))
    .dispatch();
  let value = response_json_value(response);
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_update_puppy() {
  let client = test_client();
  let response = &mut client
    .put(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "id": 11,
      "name": "NEWPUPNAME",
      "breed": "NEWPUPBREED"
    }))
    .dispatch();
  let value = response_json_value(response);
  assert_eq!(value.get("name").unwrap(), "NEWPUPNAME");
  assert_eq!(value.get("breed").unwrap(), "NEWPUPBREED");
  assert_eq!(response.status(), Status::Ok);
}

#[test]
fn test_delete_puppy() {
  let client = test_client();

  let new_pup = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "name": "NEWPUPNAME",
      "breed": "NEWPUPBREED"
    }))
    .dispatch();

  let value = response_json_value(new_pup);
  let response = &mut client
    .delete(format!("{}/{}", API_PATH, value.get("id").unwrap()))
    .dispatch();
  assert_eq!(response.status(), Status::Ok);
}
