use rust_web_app::models::puppy::Puppy;
use typescript_definitions::TypeScriptifyTrait;

// * Usage:
// * First, modify the model to be whichever model we are trying to convert to TS
// * cargo run --bin typescriptify > ../client/src/<MODELNAME>.d.ts
fn main() {
  if cfg!(any(debug_assertions, feature = "export-typescript")) {
    // * CHANGE the model for different usage
    println!("{}", Puppy::type_script_ify());
  };
}
