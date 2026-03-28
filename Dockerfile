FROM node:24-alpine

# Create app directory
WORKDIR /usr/src/app

# Create a group and user
RUN addgroup -S appgroup && adduser -S myuser -G appgroup && chown -R myuser:appgroup /usr/src/app

# Tell docker that all future commands should run as the user
USER myuser

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /src/server/package*.json ./

RUN npm ci --omit=dev

# Bundle app source
COPY /src/server/ .

ENV PORT=3000
EXPOSE 3000

CMD [ "node", "server.js" ]
