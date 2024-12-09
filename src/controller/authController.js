import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.js";

dotenv.config();
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    const { name, username, email, password,role } = req.body;

    try {
      const user = await User.create({ name, username, email, password , role});
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export const login =async (req, res) => {

    const errors =validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json("User not found");
      }
      const matched = bcrypt.compareSync(password, user.password);
      if (!matched) {
        return res.status(400).json("Invalid credentials");
      }
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRET,
        { expiresIn: "1d" }
      );
      
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
