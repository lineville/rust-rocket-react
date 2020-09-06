# Tech Stack

## Backend

- > Language: 🦀 [Rust](https://www.rust-lang.org/)
- > Database: 🐘 [PostgreSQL](https://www.postgresql.org/)
- > ORM: ⛽ [Diesel](http://diesel.rs/)
- > Web Framework: 🚀 [Rocket](https://rocket.rs/)

## Frontend

- > Language: 🟦 [TypeScript](https://www.typescriptlang.org/)
- > Framework: ⚛️ [React](https://reactjs.org/)
- > UI Framework: [Material UI](https://material-ui.com/)

---

## Getting started

- > Rust + Cargo (Nightly build -- required by Rocket)
- > Diesel (can be installed using cargo)
- > Local installation of PostgreSQL with user + password with full database privileges
- > Yarn or npm

### Run server locally

```bash
cd server
diesel migration run
cargo run
```

### Run client locally

```bash
cd client
yarn start
```

### Run both server and client locally

```bash
cd client
yarn run dev
```

### Test server

```bash
cd server
cargo test
```

### Test client

```bash
cd client
yarn test
```

### **⚡⚡⚡Convert rust models automatically into TypeScript types!⚡⚡⚡**

Modify the src/bin/typescriptify.rs file to use the model you want to use to convert to TypeScript

```bash
cd server
cargo run --bin typescriptify > ../client/src/YOUR_TYPESCRIPT_TYPE.d.ts
```
