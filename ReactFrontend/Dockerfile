FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["ReactFrontend/package.json", "ReactFrontend/package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]





# # Step 1: Build the React application
# FROM node:18 AS build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY "package.json" "package-lock.json" ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code and configuration files
# COPY public ./public
# COPY src ./src
# COPY tailwind.config.js ./


# # Build the React application
# RUN npm run build

# # Step 2: Serve the React application using Nginx
# FROM nginx:alpine

# # Copy the build output to the Nginx HTML directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy custom Nginx configuration file to the correct directory
# COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
