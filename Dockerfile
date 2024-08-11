FROM node:20.11.0

# Create the application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json file and install dependencies
COPY package.json /usr/src/app

# Update npm itself and update all packages listed in package.json
RUN npm install -g npm && npm update && npm install

# Copy the rest of the application code
COPY . /usr/src/app

# Expose the port your application will run on
EXPOSE 80

# Start the application
CMD ["npm", "start"]