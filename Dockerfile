# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.7.0
FROM node:${NODE_VERSION}-alpine as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base as build


# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# rm src
RUN rm -rf /app/src

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "prod" ]
