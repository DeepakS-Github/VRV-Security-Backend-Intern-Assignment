const mongoose = require('mongoose');

/**
 * Mongoose model for the "User" collection.
 * Defines the schema for storing user information, including:
 * - `username` (String, required): The name of the user.
 * - `email` (String, unique, required): The email address of the user.
 * - `password` (String, required): The hashed password of the user.
 * - `role` (String, optional): The role of the user, with allowed values
 *   'Admin', 'User', or 'Moderator'. Defaults to 'User'.
 * - `createdAt` (Date, optional): The timestamp when the user was created.
 *   Defaults to the current date and time.
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Moderator'],
        default: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);

