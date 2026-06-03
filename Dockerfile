ARG ARG_DOCKER_BASE_IMAGE_NAME=node
ARG ARG_DOCKER_BASE_IMAGE_VERSION=24-alpine

FROM ${ARG_DOCKER_BASE_IMAGE_NAME}:${ARG_DOCKER_BASE_IMAGE_VERSION} AS base

# Create app directory
WORKDIR /usr/src/app

FROM base AS build-react

# Copy react source files
COPY src/react-cmp ./src/react-cmp

RUN npm ci --prefix src/react-cmp --omit=dev
# Build react files in src/server/src/react-cmp/production
RUN npm run build --prefix src/react-cmp

FROM base

# Create a group and user
RUN addgroup -S appgroup && adduser -S myuser -G appgroup && chown -R myuser:appgroup /usr/src/app

# Tell docker that all future commands should run as the user
USER myuser

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY src/server/package*.json ./

RUN npm ci --omit=dev

# Bundle app source
COPY src/server/Procfile ./
COPY src/server/config.js ./
COPY src/server/server.js ./
COPY src/server/locale ./locale
COPY src/server/lib ./lib
COPY src/server/middlewares ./middlewares
COPY src/server/models ./models
COPY src/server/utils ./utils
COPY src/server/routes ./routes
COPY src/server/views ./views
COPY src/server/public ./public
COPY --from=build-react /usr/src/app/src/server/public/react-cmp/production ./public/react-cmp/production

ENV PORT=3000
EXPOSE 3000

CMD [ "node", "server.js" ]
