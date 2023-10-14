/* eslint-disable import/no-anonymous-default-export */
import { sha256 } from "js-sha256";
import conn from "../../config/db";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    const values = [req.body.data.username, sha256(req.body.data.password)];
    const result = await conn.query(query, values);
    const user = result.rows[0];
    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    } else {
      const token = jwt.sign(
        { userId: user.id, username: user.username, userType: user.userType },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.status(200).json({ user, token, message: "Token OK" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};
