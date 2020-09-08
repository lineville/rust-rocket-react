use rust_web_app::models::puppy::Puppy;
use typescript_definitions::TypeScriptifyTrait;

// * Usage:
// * - Modify the model being imported to be whichever model you'd like to 'typescriptify'
// * cargo run --bin typescriptify > ../client/src/<YOUR_MODEL>.d.ts
fn main() {
  if cfg!(any(debug_assertions, feature = "export-typescript")) {
    // * CHANGE Puppy to YOUR_MODEL
    println!("{}", Puppy::type_script_ify());
  };
}
