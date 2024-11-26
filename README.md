# Backend Documentation

## **Overview**

This backend is built with **Node.js**, **Express.js**, and **MongoDB Atlas** to handle user authentication, role-based access control (RBAC), and user management functionalities. It includes features like secure password hashing, JWT-based authentication, and role-based permissions for users, moderators, and admins.

---

## **Table of Contents**
1. [Technology Stack](#technology-stack)
2. [Features](#features)
3. [Roles and Permissions](#roles-and-permissions)
4. [Controllers](#controllers)
5. [Middlewares](#middlewares)
6. [Security Features](#security-features)
7. [Usage and API Endpoints](#usage-and-api-endpoints)
8. [Setup Instructions](#setup-instructions)
9. [Future Enhancements](#future-enhancements)

---

## **Technology Stack**

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB Atlas**: Cloud-based database for managing user data.
- **bcrypt.js**: Library for hashing passwords.
- **jsonwebtoken (JWT)**: For secure user authentication.

---

## **Features**

1. **JWT Authentication**:  
   - Generates a secure `access_token` upon successful login.  
   - Token contains the user's `_id` and `role`.

2. **Password Security**:  
   - Uses `bcrypt.js` to hash passwords before storing them in the database.

3. **Role-Based Access Control (RBAC)**:  
   - **User**: Can view their profile.  
   - **Moderator**: Can view all registered users but cannot make changes.  
   - **Admin**: Can view and delete users.

4. **User Registration and Login**:  
   - Users can sign up and log in via forms on the website.  
   - Passwords and emails are validated for security.  
   - Checks for duplicate emails during signup.

5. **CORS Configuration**:  
   - Proper CORS options are implemented to enhance security.

6. **Middlewares**:  
   - **Token Middleware**: Validates JWT tokens, checks expiration, and ensures validity.  
   - **Authorize Middleware**: Ensures users have the required permissions to access specific routes.

---

## **Roles and Permissions**

| **Role**      | **Email**             | **Password**  | **Permissions**                                                                 |
|---------------|-----------------------|---------------|---------------------------------------------------------------------------------|
| **User**      | `Signup via form`     | `Set by user` | View their profile.                                                            |
| **Moderator** | `moderator@vrv.com`   | `Moder@123`   | View all registered users (read-only access).                                  |
| **Admin**     | `admin@vrv.com`       | `Admin@123`   | View all registered users and delete users.                                    |

---

## **Controllers**

### **1. Auth Controller**
- **Endpoints**:
  - `POST /auth/signup`:
    - Registers a new user.
    - Validates email and password format.
    - Ensures `password` matches `confirmPassword`.
    - Hashes the password using `bcrypt`.
    - Checks for duplicate emails in the database.
  - `POST /auth/login`:
    - Authenticates user credentials.
    - Generates a JWT token containing `_id` and `role`.

### **2. User Controller**
- **Endpoints**:
  - `GET /user/profile`:
    - Fetches the logged-in user's profile.
    - Accessible only to `User` role.
  - `GET /user/all-profile`:
    - Fetches all registered users.
    - Accessible to `Moderator` and `Admin` roles.
  - `DELETE /user/profile/:userId`:
    - Deletes a user by ID.
    - Accessible only to `Admin` role.

---

## **Middlewares**

1. **Token Middleware**:
   - Verifies JWT tokens for:
     - Validity.
     - Expiration.
     - Correct signature.
   - Adds the decoded token data (`_id` and `role`) to the request object (`req.user`).

2. **Authorize Middleware**:
   - Ensures the user has the appropriate role for the requested route.
   - Rejects access with a `403 Forbidden` response if the user lacks the required permissions.

---

## **Security Features**

1. **Password Hashing**:
   - Ensures passwords are securely stored using `bcrypt` with a salt factor.
2. **JWT Authentication**:
   - Access tokens are generated and verified using a secret key.
   - Tokens are short-lived to minimize risk.
3. **CORS Options**:
   - Configured to restrict access to trusted origins.
4. **Input Validation**:
   - Ensures emails follow standard patterns.
   - Confirms passwords match before storing.

---

## **Usage and API Endpoints**

### **Authentication Routes**
| Method | Endpoint         | Description                                      | Access      |
|--------|------------------|--------------------------------------------------|-------------|
| POST   | `/auth/signup`   | Register a new user.                             | Public      |
| POST   | `/auth/login`    | Login and receive an `access_token`.             | Public      |

---

### **User Management Routes**
| Method | Endpoint               | Description                                        | Access             |
|--------|------------------------|----------------------------------------------------|--------------------|
| GET    | `/user/profile`        | Get the logged-in user's profile.                  | User               |
| GET    | `/user/all-profile`    | Get all registered users.                          | Moderator, Admin   |
| DELETE | `/user/profile/:userId`| Delete a user by ID.                               | Admin              |

---

## **Setup Instructions**

To run project locally, ensure you have NodeJS and MongoDB installed. Follow these steps:

1. **Clone the repository**:
    ```bash
    git clone [<repository-url>](https://github.com/DeepakS-Github/VRV-Security-Backend-Intern-Assignment)
    cd VRV-Security-Backend-Intern-Assignment
    ```

2. **Frontend Setup**:
    - Navigate to the project `client` folder.
    - Create a `.env` file in the root directory of the `client` folder.
    - Add the following environment variables to the client `.env` file:
        ```plaintext
        VITE_SERVER_URL = "https://vrv-security-server.vercel.app" 
        # Replace if you want to run the Backend local server to http://localhost:5000
        ```
    - To run the Frontend:
        ```bash
        npm run dev
        ```

3. **Backend Setup**:
    - In new terminal navigate to the project `server` folder.
    - Create a `.env` file in the root directory of the `server` folder.
    - Add the following environment variables to the server `.env` file:
        ```plaintext
        MONGO_DB_URL = {your mongodb url}
        JWT_SECRET = {jwt secret}
        ```
    - To run the Backend:
        ```bash
        # Use nodemon for automatic server restarts upon file changes
        nodemon
        # or
        # Run the server with NodeJS
        node index.js
        ```

By following these steps, you'll have the application running locally on your machine. Adjust configurations as needed for your development environment.

---

## Contribution

## **Future Enhancements**

1. Add password reset functionality.
2. Implement account deactivation instead of permanent deletion.
3. Add activity logging for admin actions (e.g., deleting users).
4. Use refresh tokens for improved authentication management.
5. Implement rate-limiting to prevent brute-force attacks.


