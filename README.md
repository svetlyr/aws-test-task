# aws-test-task

## Overview

This project is a serverless application built using AWS Lambda, API Gateway, and Cognito for user authentication. It provides functionality for user auth with Auth Guards and lambda integration.

## Getting Started

### Prerequisites

- Node.js
- pnpm (preferred) or npm
- Docker (for prod Docker image generation)

### Installation

Clone the repository:

```bash
git clone https://github.com/svetlyr/aws-test-task
cd aws-test-task
```

Install dependencies:

```bash
pnpm install
```

Setup .env file:
``` bash
cp .env.example .env.development
```
And fill in the env vars.

### Local Development

To start the project for local development with custom hot module reloading (HMR) webpack config:

```bash
pnpm start:dev
```

### **Access Swagger UI:**
Open your web browser and navigate to `http://localhost:3000/api`.


### **Register a New User:**
   - In Swagger UI, locate the `/auth/register` endpoint.
   - Click on the endpoint to expand its details.
   - Click on the "Try it out" button.
   - Provide the required information (e.g., username, email, password) as per the provided examples.
   - Click on the "Execute" button to send the request.

### **Confirm the User:**
   - Access /auth/confirm and input the user name (ex: JohnDoe)
### **Login as the User:**
   - In Swagger UI, locate the `/auth/login` endpoint.
   - Click on the endpoint to expand its details.
   - Provide the credentials of the registered user (use the provided examples or the credentials you used during registration).
   - Click on the "Execute" button to send the request.
   - Note the `IdToken` returned in the response.

### **Authorize Swagger UI with the Token:**
   - Click on the "Authorize" button located at the top right corner of Swagger UI.
   - Enter the or `IdToken` obtained after logging in.
   - Click "Authorize" to set the token.

### **Access User Endpoints:**
   - Once authorized, you can now access the user-related endpoints (e.g., `/user/`) available in the Swagger UI.

### Deployment

To deploy the project as a Lambda function:

```bash
pnpm start:lambda:pnpx
```

If you don't have pnpm installed, you can use npm:

```bash
npm run start:lambda:npx
```

### Docker Image Generation

To generate an optimized Docker image for AWS:

```bash
docker-compose up
```

## Important Decisions

### Decision to Use NestJS

NestJS was chosen due to its out-of-the-box application architecture, allowing developers to create highly testable, scalable, and maintainable applications. It embraced modern JavaScript and TypeScript features and provided a robust framework for building server-side applications.

### Specifying AWS Region

The AWS region was specified in the `serverless.yml` configuration to deploy the application in the desired geographic location, ensuring lower latency for end-users and compliance with data residency requirements. The region was set directly in the provider section of the `serverless.yml` file.

### Path Aliases:
Path aliases were implemented to simplify import statements, making them more readable and easier to manage, especially in large projects with deep directory structures. This enhanced code maintainability and reduced the likelihood of errors during refactoring.

They also enabled more straightforward navigation to files within IDEs, improving developer efficiency.

### Importance of Setting Up ESLint:
ESLint was configured to enforce coding standards and detect patterns that may lead to errors, ensuring that the codebase remained clean and consistent. This was vital for team collaboration and code quality.
Customizable rules allowed teams to enforce best practices and specific coding styles, aligning with the project's needs and helping new developers adhere to established guidelines.

### Using Auth Guards:
Auth guards were implemented to secure routes and endpoints in the application, ensuring that only authenticated users could access protected resources. They provided a layer of security by intercepting incoming requests and verifying the user's authentication status before allowing access to protected routes.

### Extracting User Info from IdToken:

- User info was extracted from the IdToken issued by AWS Cognito, including user attributes such as username, email, and custom attributes.
- A service or utility function was created to parse the JWT and retrieve the necessary user attributes, which were then put into the request for accessibility to the controller while remaining invisible for attacks.

### Accessing User Info from Request Body:
- User information could also be accessed from the request body when handling HTTP requests in the NestJS application. The userinfo from the IdToken was put into the request, making it accessible to the controller but not visible for attacks.
- By using the @Body decorator or similar techniques, developers could easily access user info from the request body and perform actions based on this information, such as updating user profiles or processing user-submitted data.

### Docker Production Image Optimizations:

- Significant optimizations were implemented to streamline the Docker production image for the NestJS application, ensuring efficient resource utilization and enhanced performance.
- The Dockerfile was meticulously crafted to leverage multi-stage builds, minimizing the final image size and reducing the overall footprint.
- Each stage of the Docker build process was carefully optimized to eliminate unnecessary dependencies and reduce the number of layers, resulting in faster build times and improved efficiency.
- Caching mechanisms were employed intelligently to cache dependencies and intermediate build artifacts, speeding up subsequent builds and deployments.
- Lightweight base images, such as Alpine Linux, were utilized to keep the Docker image size to a minimum while still providing the necessary runtime environment for the application.
- Dependency management techniques, including caching package managers like npm or pnpm, were implemented to optimize the installation of application dependencies and reduce build times.
- Image layering strategies were employed to separate application code from dependencies, facilitating better cache utilization and promoting faster deployments.
