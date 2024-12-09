import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/user.js";
import dotenv from "dotenv";
import { login, signup } from "../controller/authController.js";
dotenv.config();

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *       example:
 *         name: John Doe
 *         username: user123
 *         email: user@example.com
 *         password: password123
 *         role: user
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for user authentication and management
 */
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               username: johndoe
 *               password: password123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for authentication
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post(
  "/signup",
  [
    body("name", "Name is required").notEmpty(),
    body("username", "Username is required").isLength({ min: 6 }).notEmpty(),
    body("email", "Email is required").isEmail().notEmpty(),
    body("password", "Password is required").isLength({ min: 6 }).notEmpty(),
    body("role").optional().isIn(["admin", "user"]).withMessage("Invalid role"),
  ],
  signup
);

router.post(
  "/login",
  [
    body("username", "username is required").notEmpty(),
    body("password", "Password is required").notEmpty(),
  ],
  login
);

export default router;