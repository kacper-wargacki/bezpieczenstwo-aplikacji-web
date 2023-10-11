/* eslint-disable import/no-anonymous-default-export */
import conn from "../../config/db";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const result = await conn.query(req.body.query);
    const user = result.rows[0]
    const token = jwt.sign({ userId: user.id, username: user.username, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    console.log({user, token})
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};
