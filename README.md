# Minimal configuration for an ExpressJS website and React frontend

This is a minimal template for a website powered by Node 16.x, ExpressJS and Pug template engine.

## Backend

See the server [documentation](./src/server/README.md) to launch a local server.

## Frontend

See the frontend [documentation](./src/react-cmp/README.md) to contribute to the frontend.

## Docker

- Build the docker image with `mise run docker:build`.
  - By default, the tag will be the sha of the current commit.
  - Run `mise run docker:build -t <tag>` to build with a specific tag.
- Run the docker image with `mise run docker:run -p <host_port>`.
  - By default, the tag of the image to run will be the sha of the current commit, so you must build an image first before running it.
  - By default, the docker image will be accessible on <http://localhost:3000>.
  - To stop the container, in another terminal:
    - Run `docker ps` to get its ID.
    - Run `docker stop <container_id>` to stop it.

### Push to Github registry

- By default, the registry is set to `ghcr.io` so you must login to the registry with:
  - A Github token with `repo, write:packages` permissions.
  - Login to the registry

    ```bash
    echo "<your_token>" | docker login ghcr.io -u USERNAME --password-stdin
    ```

- Run `mise run docker:push`.

## Docker compose

- Run the MySQL container along an instance of dbgate with:

```bash
docker compose --env-file .env.docker-compose up
# or run in detached mode
docker compose --env-file .env.docker-compose up -d
```

- Stop the containers with

```bash
docker compose --env-file .env.docker-compose down
```

- Feel free to customize the ports by updating the `.env.docker-compose`.

## Kubernetes

You can run the app in a local kubernetes cluster, e.g. with Rancher:

- Ensure to have Rancher running with Kubernetes support
- Switch to the rancher context (if applicable):

```bash
kubectx rancher-desktop
```

- Deploy the configuration in the cluster:

```bash
kubectl apply -f k8s/website.yaml
```

- Access the website through <http://localhost:30080/>
- Remove the configuration from the cluster:

```bash
kubectl delete -f k8s/website.yaml
```
