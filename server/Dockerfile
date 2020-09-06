FROM debian:jessie AS builder

# You'll need to change `libmysqlclient-dev` to `libpq-dev` if you're using Postgres
RUN apt-get update && apt-get install -y curl libpq-dev build-essential

# Install rust
RUN curl https://sh.rustup.rs/ -sSf | \
  sh -s -- -y --default-toolchain nightly

ENV PATH="/root/.cargo/bin:${PATH}"

ADD . ./

# RUN cargo install diesel_cli --no-default-features --features postgres
# RUN diesel migration run
RUN cargo build --release --bin main

FROM debian:jessie

RUN apt-get update && apt-get install -y libpq-dev

COPY --from=builder \
  /target/release/main \
  /usr/local/bin/

ENV DATABASE_URL=postgres://lineville:Bazel2()@localhost/puppies

WORKDIR /root
CMD ROCKET_PORT=$PORT /usr/local/bin/main