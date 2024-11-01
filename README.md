# Course Management System

## Description

This Course Management System is designed to facilitate the management of courses, modules, and lessons. The application allows users to create, retrieve, update, and delete course information through a RESTful API. Built with TypeScript and Express, it features Swagger for API documentation and Winston for logging.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete (CRUD) courses.
- Validation of course data using Joi.
- Logging of requests and errors using Winston.
- API documentation with Swagger UI.
- CORS support for cross-origin requests.

## Technologies

- **Node.js**: JavaScript runtime for building the API.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Express**: Web framework for building APIs.
- **Joi**: Validation library for JavaScript objects.
- **Winston**: Logging library for Node.js.
- **Swagger**: API documentation framework.
- **Nodemon**: Tool for automatically restarting the application during development.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/ingenius-intern-case-study.git
   cd ingenius-intern-case-study
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   PORT=3000
   ```

## Usage

**Development**
To start the server in development mode, run:

```bash
npm run dev
```

This will start the server using Nodemon, which automatically restarts the server upon file changes.

**Production**
To build and run the application in production mode, execute:

```bash
npm run build
npm start

```

## API Documentation

The API is documented using Swagger. To access the documentation, start the server and navigate to http://localhost:3000/api-docs in your browser.

**Endpoints**

- GET /courses : Retrieve all courses.
- GET /courses/:id : Retrieve a course by its ID.
- POST /courses : Create a new course.
- PUT /courses/:id : Update an existing course by its ID.
- DELETE /courses/:id : Delete a course by its ID.

## Scripts

**npm run build**: Compiles the TypeScript code to JavaScript.
**npm run start**: Starts the application in production mode.
**npm run dev**: Starts the application in development mode with live reload.
**npm test**: Runs the test suite (add your tests as needed).

## License

This project is licensed under the ISC License.
