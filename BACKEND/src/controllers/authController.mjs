import express from "express";
import { response } from "../utils/response.mjs";
// import { authenticateToken } from "../middlewares/authMiddlewares.mjs";
import { environment } from "../config/dbconnection.mjs";
// import { validateEmailandPassword } from "../middlewares/auth.mjs";
import { createHmac } from 'node:crypto';
import { generateAuthToken } from "../utils/jwtToken.mjs";

import { login,checkEmailExists,checkOrgCode,insertUser } from "../models/authModle.mjs";

const authController = express.Router(); 

/**
 * This router checks if the user is authenticated 
 * 
 * @param {string} email
 * @param {string} password
 */

authController.post("/login", (req, res) => {
  const { email, password } = req.body;
  const pass = createHmac('sha256', environment.superSecreate).update(password).digest('hex');
  console.log("pass", pass);
  
  login(email,pass).then((result) => {
    if (result.length === 0) {
      return response.notFound(res,"There is no user");
    }

    generateAuthToken(result[0], function (userdata) {
      response.success(res, { userdata: userdata });
    });
  })
  .catch((err) => {
    return response.serverError(res, err, "An error occurred while trying to login");
  });
});

authController.put("/signup", async (req, res) => {
  const { mobile, name , email , password ,org_code } = req.body;
  const pass = createHmac('sha256', environment.superSecreate).update(password).digest('hex');
  try {
   
    const emailExists = await checkEmailExists(email);
    if (emailExists.length > 0) {
      return response.error(res, "There is a user with this email");
    }
    let orgId = null;
    if(org_code && org_code !== "null" && org_code !== "undefined"){
        orgId = await checkOrgCode(org_code);
    }

    if (orgId === null) {
      const defaultOrgCode = 0;
      await insertUser(name, email, pass, mobile, defaultOrgCode);
    } else {
      await insertUser(name, email, pass, mobile, orgId);
    }

    return response.success(res, "User created successfully");
  } catch (err) {
    return response.serverError(res, err, "An error occurred while trying to sign up");
  }
});

export default authController;