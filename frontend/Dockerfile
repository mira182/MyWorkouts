## Use Node.js LTS version as the base image
#FROM node:lts AS builder
#
## Set working directory
#WORKDIR /app
#
## Copy package.json and package-lock.json
#COPY package*.json ./
#
#RUN npm cache clear --force
#RUN rm -rf node_modules
#RUN rm -rf package-lock.json
#
##RUN npm config set fetch-retry-mintimeout 20000
##RUN npm config set fetch-retry-maxtimeout 120000
##RUN npm config delete proxy
##RUN npm config rm proxy
##RUN npm config rm https-proxy
#RUN npm config set registry http://registry.npmjs.org/
#
## Install Angular CLI globally
#RUN npm install -g @angular/cli
#
## Install dependencies
#RUN npm install -f --verbose
#
## Copy the rest of the application
#COPY . .
## TODO figure out how to use this as paramater dev-build/prod-build
## Build the Angular app
#RUN npm run prod-build
#
#
## Use nginx as the base image for serving the Angular app
#FROM nginx:alpine
#
## Copy the built Angular app from the previous stage
#COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
#
## Command to run nginx
#CMD ["nginx", "-g", "daemon off;"]

FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies from the committed lockfile for reproducible builds.
# Copying package files first keeps this layer cached when only source changes.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application and build the production bundle
COPY . .
RUN npm run prod-build


# Use nginx as the base image for serving the Angular app
FROM nginx:1.27-alpine

# Copy the built Angular app from the previous stage
COPY --from=builder /usr/src/app/dist/frontend/browser /usr/share/nginx/html

# Replace nginx's stock server block (avoids two servers listening on port 80)
COPY myworkouts-nginx.conf /etc/nginx/conf.d/default.conf

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
