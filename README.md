# API Boilerplate

This project is a Node.js API for user management, authentication, and integration with external services like OpenWeatherMap (weather data) and CoinGecko (crypto prices). It includes caching, retries, and unit tests following best practices.

## Technologies Used

This project is built using modern and efficient technologies:

- **TypeScript**: Ensures type safety, better maintainability, and improved development experience.
- **Express.js**: A fast and minimal web framework for handling API requests.
- **Zod**: Used for input and output validation, ensuring API requests and responses follow the correct structure.
- **Prisma ORM**: A modern and type-safe ORM for database interactions, simplifying queries and migrations.
- **Node-Cache**: Provides in-memory caching to reduce redundant API calls and improve performance.
- **Auto-Swagger Generation**: Automatically generates API documentation from route definitions. (available at `${url}/docs`)
- **CORS**: Enables Cross-Origin Resource Sharing to allow external clients to access the API securely.
- **Gzip Compression**: Improves API response performance by compressing responses before sending them to the client.
- **Rate Limiter**: Protects the API from abuse by limiting the number of requests a client can make within a specified time frame.

## Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/lastonoga/express-api-example.git
cd express-api-example
```

### 2️⃣ Install Dependencies

```
yarn install
```

or

```
npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory with the necessary API keys, database connection, and other configurations.

```
NODE_ENV=production
JWT_SECRET_TOKEN=test
JWT_TOKEN_EXPIRE=24h
OPENWEATHER_API_TOKEN=abcd
API_URL=http://localhost:8001
API_PORT=8001
```

### 4️⃣ Run Database Migrations (Prisma)
```bash
yarn prisma migrate dev --name init
```

### 5️⃣ Build & Start the Server
For development mode (auto-reload):
```
yarn dev
```

For production mode:
```
yarn build && yarn start
```

## Running Tests

Unit & integration tests are written with Jest & Supertest.

### Run all tests:
```
yarn test
```
### Run tests in watch mode:
```
yarn test --watch
```

## Project Structure

The project follows a structured approach to keep concerns separate and maintainable.

- `app/`: Contains core application logic, divided into subdirectories:
  - `services/`: Implements business logic, such as user management and API integrations.
  - `routes/`: Route definitions connecting controllers to API endpoints.
  - `utils/`: Helper functions for various tasks such as error handling, formatting, and data validation.
- `config/`: Configuration files for database, authentication, and third-party API connections.
- `prisma/`: Contains DB migrations, schemas and seeds.
- `tests/`: Contains unit and integration tests using Jest and Supertest.
- `dist/`: Auto-generated compiled JavaScript files from TypeScript after running yarn build.

----

## 📌 Project Scripts Guide

This document provides an overview of the available commands in `package.json` for **development, building, linting, formatting, database management, and testing**.


### 🚀 Development & Build Commands

| Command             | Description |
|---------------------|-------------|
| **`yarn dev`**     | Starts the development server using `tsx`, watches for file changes, and loads environment variables from `.env`. |
| **`yarn build`**   | Runs Prisma client generation (`prisma generate`) and compiles the application. |
| **`yarn start`**   | Runs the compiled application from `dist/` using `node`, with `ts-node` and `tsconfig-paths` for alias resolution. |


### 🛠 Linting & Formatting

| Command             | Description |
|---------------------|-------------|
| **`yarn lint`**    | Runs ESLint to detect code issues. |
| **`yarn lint:fix`** | Runs ESLint and automatically fixes errors where possible. |
| **`yarn format`**  | Formats the code using Prettier. |
| **`yarn format:check`** | Checks if the code is properly formatted without modifying files. |


### 🛢 Database Management (Prisma)

| Command                     | Description |
|-----------------------------|-------------|
| **`yarn prisma:generate`**  | Generates the Prisma client based on the latest database schema. |
| **`yarn prisma:migrate:dev`** | Runs Prisma migrations for local development. |
| **`yarn prisma:migrate`**   | Deploys migrations in a production environment. |


### 🧪 Testing Commands

| Command               | Description |
|-----------------------|-------------|
| **`yarn test`**       | Runs all Jest unit and integration tests. |
| **`yarn test:watch`** | Runs Jest in watch mode, re-running tests on file changes. |
| **`yarn test:coverage`** | Runs Jest with a coverage report, showing tested lines of code. |

---

This document provides an overview of installation, structure, and package commands to help with setting up and understanding the project.
