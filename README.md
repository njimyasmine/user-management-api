# User Management API

## Overview

The User Management API is a Node.js application designed to handle CRUD operations for user management. This README provides instructions for setting up and running the API, explains the design decisions and technologies used, and documents the API endpoints.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Design Decisions and Used Technologies](#design-decisions-and-used-technologies)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Libraries Used](#libraries-used)

## Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js**: Version 20.x or later
- **NPM**: Version 9.x or later

## Getting Started

Follow these steps to set up and run the application:

1. **Clone the Repository**

   Clone the repository to your local machine using git:

   ```bash
   git clone https://github.com/njimyasmine/user-management-api.git
   cd user-management-api
   ```
2. **Install Dependencies**
Navigate to the project directory and install the necessary packages:

    ``` bash
    npm install
    ```

3. **Run the Application**

   To start the application, use the following command:

    ``` bash
    npm start
    ```
The API will be available at http://localhost:3000.

## Design Decisions and Used Technologies
### Technologies Used
- **Node.js:** Chosen for its asynchronous capabilities and performance.
- **JSON File:** Used for data persistence in this project due to its simplicity and ease of setup.
- **JWT (JSON Web Tokens):** Implemented for secure user authentication.
### Design Decisions
- **Separation of Concerns:** The project is structured into folders such as routes, controllers, middleware, and data to separate different parts of the application logically.
- **JWT-based Authentication:** JWT is used to secure routes that require user authentication, ensuring only authenticated users can access certain endpoints.
- **Validation:** Input data is validated using the validator library to ensure correct formats and uniqueness where required.
- **Error Handling:** Proper error handling ensures that clients receive meaningful error messages when something goes wrong.

## API Documentation
### Base URL
The base URL for the API is http://localhost:3000.

### Endpoints
1.**Create a New User**
- **Method:** `POST`
- **URL:** `/users`
- **Description:** Creates a new user.
- **Parameters:** None
- **Request Body:**
  ```json
  {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
  }
- Response Code: 200 (Success)
- Media Type: Success

2.**Read All Users**

- **Method :** `GET`
- **URL:** `/users`
- **Description:** Retrieves a list of all users.
- **Parameters:**
   - `page` (optional): The page number for pagination.
   - `limit` (optional): The number of users per page.
- **Response Code:** 200 (OK)
- **Media Type:** application/json

3.**Read a Specific User by ID**

- **Method :** `GET`
- **URL:** `/users/:id`
- **Description:** Retrieves a specific user by their ID.
- **Response Code:** 200 (OK)
- **Media Type:** application/json

4.**Update a User**
- **Method :** `PUT`
- **URL:** `/users/:id`
- **Description:** Updates an existing user.
- **Request Body:**
  ```json
  {
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
  }
- **Response Code:** 200 (OK)

5.**Delete a User**
- **Method :** `DELETE`
- **URL:** `/users/:id`
- **Description:** Deletes a user by their ID.
- **Response Code:** 200 (OK)


6.**User Login**
- **Method :** `POST`
- **URL:** `/auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
  "email": "john.doe@example.com",
  "password": "password123"
  }
- **Response Code:** 200 (OK)
- **Media Type:** application/json


## Project Structure
Here's a brief overview of the project's folder structure:
``` sh
user-management-api/
│
├── controller/
│   └── userController.js
├── data/
│   └── users.json
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── .env
├── index.js
├── package.json
├── package-lock.json
└── README.md
```
## Libraries Used
The following libraries/packages were used in this project:

- **Express.js:** Web framework for Node.js.
- **UUID:** For generating unique IDs for users.
- **Bcryptjs:** For hashing user passwords.
- **Validator:** For validating email addresses.
- **Jsonwebtoken:** For implementing JWT-based authentication.

These libraries were chosen for their functionality, compatibility with the project requirements, and ease of integration.





