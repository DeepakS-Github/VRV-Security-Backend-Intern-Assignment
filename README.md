# Backend Documentation  

## **Overview**  

This backend is built with **Node.js**, **Express.js**, and **MongoDB Atlas** to handle user authentication, role-based access control (RBAC), and user management functionalities. It includes features like secure password hashing, JWT-based authentication, and role-based permissions for users, moderators, and admins.  

---

## **Access Credentials**  

### Admin Login:  
- **Email:** Based on ENV variable `ADMIN_EMAIL`  
- **Password:** Based on ENV variable `ADMIN_PASSWORD`  

### Moderator Login:  
- **Email:** Any user promoted to moderator by the admin.  
- **Password:** Set by the user during registration.  

---  

## **Hosted Link**  

You can access the live project at: https://vrv-security-two.vercel.app/login.  

>  **Admin Credentials**  
>  To log in as an admin and explore all available features, use the following credentials:  
>  - **Email**: `admin@vrv.com`  
>  - **Password**: `Admin@123`  



---

![diagram-export-11-27-2024-1_48_26-AM](https://github.com/user-attachments/assets/51c8795d-3d16-405c-8f70-6c1ce0686670)  

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
   - Token expiry times are adjustable via `token-expiry.constant.js`:  
     - **User**: 24 hours.  
     - **Admin/Moderator**: 1 hour.  

2. **Password Security**:  
   - Uses `bcrypt.js` to hash passwords before storing them in the database.  

3. **Role-Based Access Control (RBAC)**:  
   - **User**: Can view their profile.  
   - **Moderator**: Can view all registered users but cannot make changes.  
   - **Admin**: Can view, delete, and now update the roles of users.  
     - The admin can change roles between `User` and `Moderator` using the route:  
       `PATCH /user/profile-role/:userId`.  
     - The maximum number of moderators is configurable in `moderator.constant.js` (default: 5).  

4. **User Registration and Login**:  
   - Users can sign up and log in via forms on the website.  
   - Passwords and emails are validated for security.  
   - Checks for duplicate emails during signup.  

5. **Automatic Admin Creation**:  
   - If no admin exists, one is created automatically using credentials from ENV variables:  
     ```plaintext  
     ADMIN_USERNAME = {username}  
     ADMIN_EMAIL = {email}  
     ADMIN_PASSWORD = {password}  
     ```  
   - Logs success or failure in the server logs during startup.  

6. **CORS Configuration**:  
   - Proper CORS options are implemented to enhance security.  

---

## **Roles and Permissions**  

| **Role**      | **Permissions**                                                                 |  
|---------------|---------------------------------------------------------------------------------|  
| **User**      | View their profile.                                                            |  
| **Moderator** | View all registered users (read-only access).                                  |  
| **Admin**     | View, delete users, and update user roles.                                      |  

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
  - `PATCH /user/profile-role/:userId`:  
    - Updates the role of a user.  
    - Role can be toggled between `User` and `Moderator`.  
    - Admin-only access.  
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

## **Usage and API Endpoints**  

| **Endpoint**               | **Method** | **Description**                                                            | **Authorization**        |  
|----------------------------|------------|----------------------------------------------------------------------------|--------------------------|  
| `/auth/signup`             | POST       | Registers a new user with email and password.                              | Public                   |  
| `/auth/login`              | POST       | Logs in a user and returns a JWT token.                                    | Public                   |  
| `/user/profile`            | GET        | Retrieves the logged-in user's profile.                                    | `User`                   |  
| `/user/all-profile`        | GET        | Fetches all users (read-only for Moderator, Admin can delete/edit roles).  | `Moderator`, `Admin`     |  
| `/user/profile-role/:id`   | PATCH      | Updates a user's role (`User` ↔ `Moderator`).                              | `Admin`                  |  
| `/user/profile/:id`        | DELETE     | Deletes a user's profile by their ID.                                      | `Admin`                  |  

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
5. **Automatic Admin Creation**:  
   - Logs errors if admin creation fails, while ensuring server continuity.  

---

## **Setup Instructions**  

To run the project locally, ensure you have Node.js and MongoDB installed. Follow these steps:  

1. **Clone the repository**:  
    ```bash  
    git clone https://github.com/DeepakS-Github/VRV-Security-Backend-Intern-Assignment
    cd VRV-Security-Backend-Intern-Assignment  
    ```  

2. **Frontend Setup**:  
    - Navigate to the project `client` folder.  
    - Create a `.env` file in the root directory of the `client` folder.  
    - Add the following environment variables to the client `.env` file:  
        ```plaintext  
        VITE_SERVER_URL = "https://vrv-security-server.onrender.com"  
        ```  
    - To run the Frontend:  
        ```bash  
        npm run dev  
        ```  

3. **Backend Setup**:  
    - Navigate to the `server` folder.  
    - Create a `.env` file in the root directory of the `server` folder.  
    - Add the following environment variables to the client `.env` file:  
        ```plaintext  
        MONGO_DB_URL = {mongodb url}  
        JWT_SECRET = {jwt secret}  
        PORT = {port}  
        ADMIN_USERNAME = {custom_admin_username}  
        ADMIN_EMAIL = {custom_admin_email}  
        ADMIN_PASSWORD = {custom_admin_password}   
        ```   
    - To run the Backend:  
        ```bash  
        node index  
        ```  

---

## **Future Enhancements**  

1. Add password reset functionality.  
2. Implement account deactivation instead of permanent deletion.  
3. Add activity logging for admin actions (e.g., deleting users).  
4. Use refresh tokens for improved authentication management.  
5. Implement rate-limiting to prevent brute-force attacks.  

---
