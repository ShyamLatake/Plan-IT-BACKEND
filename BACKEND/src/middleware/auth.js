import { response } from "../utils/response.mjs";
export const validateInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return response.badRequest(res, 400, "Email and password are required");
  }
  next();
};
