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

FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm cache clear --force
RUN rm -rf node_modules
RUN rm -rf package-lock.json

RUN npm install -g @angular/cli

RUN npm install --verbose

# Copy the rest of the application
COPY . .
# TODO figure out how to use this as paramater dev-build/prod-build
# Build the Angular app
RUN npm run prod-build


# Use nginx as the base image for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=builder /usr/src/app/dist/frontend/browser /usr/share/nginx/html

#COPY myworkouts-nginx.conf /etc/nginx/conf.d/

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
