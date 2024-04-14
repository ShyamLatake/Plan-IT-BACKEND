import { environment } from "../config/dbconnection.mjs";
const db = environment.db;

export const login = async ( email, password) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE user_email = ? AND password = ?', [email, password], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

export const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE user_email = ?', [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export const checkOrgCode = (org_code) => {
  return new Promise((resolve, reject) => {
  db.query('SELECT org_id FROM organization WHERE org_code = ?', [org_code], (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          resolve(null);
        } else {
          resolve(result[0].org_id);
        }
      }
    });
  });
}

export const insertUser = (name, email, password, mobile, org_id) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO user (user_name, user_email, password, user_mobile, org_id) VALUES (?, ?, ?, ?, ?)', [name, email, password, mobile, org_id ], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}