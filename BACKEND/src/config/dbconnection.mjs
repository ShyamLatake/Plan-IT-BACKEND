import mysql from "mysql2";

export const  environment = {}
environment.connection = mysql.createPool({
    host: "localhost",
    user: "dev",
    password: "Development@123",
    database: "evenza",
});
environment.connection.getConnection(function (err, connection) {
    if (err) console.log("db conection err", err);
});
environment.db = environment.connection;
  
environment.superSecreate = "akdhgdspaayiugkhrskdwieutyipwrilhdnfdiygohidlhkf"

