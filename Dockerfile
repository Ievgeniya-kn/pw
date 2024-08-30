# Base Image
FROM mcr.microsoft.com/playwright:v1.44.0-jammy
# Set the working directory
WORKDIR /pw-tests
# Copy package.json and package-lock.json
COPY . .
# Install dependencies
RUN npm install

# Set the entry point for the container
CMD ["npx", "playwright", "test","hw20.spec.ts"]
