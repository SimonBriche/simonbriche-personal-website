# Minimal configuration for an ExpressJS website and React frontend

This is a minimal template for a website powered by Node 16.x, ExpressJS and Pug template engine.

## Backend

See the server [documentation](./src/server/README.md) to launch a local server.

## Frontend

See the frontend [documentation](./src/react-cmp/README.md) to contribute to the frontend.

## Docker

- Build the docker image with `mise run docker:build`.
- Run the docker image with `mise run docker:run -p <host_port>`. By default, the docker image will be accessible on <http://localhost:3000>.
