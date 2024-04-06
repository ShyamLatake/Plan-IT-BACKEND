import jwt from 'jsonwebtoken';
import { environment } from '../config/dbconnection.mjs';

/**
 * In this function we are genrating  JWT AuthToken that we are going to use for sessions
 * with the help of this token we can protect our routes from illegal access
 * @param {This parameter is returning the user information that is useful for genrating authToken} user 
 * @param {*} callback 
 */
export const generateAuthToken = (user, callback) => {
  const tokenData = {
      user_id: user.user_id,
      org_id: user.org_id,
      user_name: user.user_name,
      user_email: user.user_email
  };
  console.log("tokenData", tokenData);

  const expirationInSeconds = 60 * 60 * 24 * 365 * 10; // Token expires in 10 years
  try {
      const token = jwt.sign(tokenData, environment.superSecreate, {
          expiresIn: expirationInSeconds,
      });
      tokenData.token = token;
      console.log("tokenData", tokenData);
      callback(tokenData); // Pass token data to callback
  } catch (error) {
      console.error("Error generating token:", error);
      callback(error, null); // Pass error to callback
  }
};

/**
 * In this function we are decoding token to get the user informations
 * @param {This parameter has genrated token} token 
 * @returns 
 */
export const decodeAuthToken = (token) => {
    return jwt.decode(token);
}

/**
 * In this function we are verifying the jwt token so that we can protect our routes 
 * if the token is verified successfully then it will return object which has success and data property
 * @param {This parameter has genrated token} token 
 * @returns 
 */
export  const verifyJwtToken = (token) => {
    try {
        const decoded = jwt.verify(token, environment.superSecreate);
        return { success: true, data: decoded };
      } catch (error) {
        return { success: false, error: error.message };
      }
}

