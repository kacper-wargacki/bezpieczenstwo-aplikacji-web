/* eslint-disable import/no-anonymous-default-export */
import conn from "../../config/db";

export default async (req, res) => {
  try {
    const query1 = `SELECT * FROM users WHERE username = $1`;
    const values1 = [req.body.username];
    const users = await conn.query(query1, values1);
    const userExists = users.rows.length > 0;
    if (userExists) {
      res.status(409).json({ message: "User already exists" });
    } else {
      const query = "INSERT INTO users(username, password) VALUES($1, $2)";
      const values = [req.body.username, req.body.password];
      const result = await conn.query(query, values);
      res.status(200).json({ result });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
