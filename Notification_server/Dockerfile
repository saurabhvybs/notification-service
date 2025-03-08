# Use Node.js 18 Alpine as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json from the root directory
COPY ../package.json ../package-lock.json ./

# Install dependencies using npm
RUN npm install --omit=dev

# Copy the entire Notification_server directory into the container
COPY . .

# Expose the port your service runs on (change if needed)
EXPOSE 3000

# Start the Hono server
CMD ["node", "index.js"]  # Adjust based on your entry file
