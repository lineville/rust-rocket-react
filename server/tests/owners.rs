mod common;

use common::*;
use rocket::http::{ContentType, Status};

const API_PATH: &'static str = "/api/owners";

#[test]
fn test_get_owners() {
  let client = test_client();

  let new_owner = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "first_name": "Liam",
      "last_name": "Neville"
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
      response_json_value(new_owner).get("id").unwrap()
    ))
    .dispatch();
}

#[test]
fn test_create_owner() {
  let client = test_client();
  let response = &mut client
    .post(API_PATH)
    .header(ContentType::JSON)
    .body(json_string!({
      "first_name": "Billy",
      "last_name": "Bob"
    }))
    .dispatch();
  let value = response_json_value(response);
  assert_eq!(value.get("first_name").unwrap(), "Billy");
  assert_eq!(value.get("last_name").unwrap(), "Bob");
  assert_eq!(response.status(), Status::Ok);

  // * Clean up
  client
    .delete(format!("{}/{}", API_PATH, value.get("id").unwrap()))
    .dispatch();
}
