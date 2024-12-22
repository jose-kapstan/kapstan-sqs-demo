# Start from a lightweight Node.js image
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the application files
COPY index.js ./

# Set environment variables as needed
# These can also be overridden by Kubernetes environment variables.
# ENV REGION=us-east-1
# ENV QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue

# Start the application
CMD ["npm", "start"]