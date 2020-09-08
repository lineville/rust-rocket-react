table! {
    owners (id) {
        id -> Int4,
        first_name -> Varchar,
        last_name -> Varchar,
    }
}

table! {
    puppies (id) {
        id -> Int4,
        name -> Varchar,
        breed -> Varchar,
        age -> Int4,
        owner_id -> Nullable<Int4>,
    }
}

joinable!(puppies -> owners (owner_id));

allow_tables_to_appear_in_same_query!(
    owners,
    puppies,
);
