use super::schema::puppies;

#[derive(Queryable, Identifiable, AsChangeset)]
#[table_name = "puppies"]
pub struct Puppy {
  pub id: i32,
  pub name: String,
  pub breed: String,
}

#[derive(Insertable)]
#[table_name = "puppies"]
pub struct NewPuppy<'a> {
  pub name: &'a str,
  pub breed: &'a str,
}
