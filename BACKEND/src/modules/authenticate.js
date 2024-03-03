import express from "express";
import { response } from "../utils/response.mjs";
import { validateInput } from "../middleware/auth.js";

const authRouter = express.Router(); 

/**
 * this is used to handle the response from the server to the client side of the application
 * this route is used to handle the login of a user into the application validating the email and password of the user
 * validateInput is a middleware used to validate the input of the user
 * @param {string} email
 * @param {string} password
 */

authRouter.post("/login",validateInput, (req, res) => {
  const { email, password } = req.body;
  if (email.trim() === "" || password.trim() === "") {
    // Trim input to handle empty spaces
    return response.badRequest(res, 400, "Email and password are required");
  }
  // Simulating login success for demonstration purposes
  return response.success(res, 200, "Login successful");
});

export default authRouter;
