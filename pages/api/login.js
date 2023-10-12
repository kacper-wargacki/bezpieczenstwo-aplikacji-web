/* eslint-disable import/no-anonymous-default-export */
import conn from "../../config/db";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    const values = [req.body.data.username, req.body.data.password];
    const result = await conn.query(query, values);
    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, username: user.username, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};
