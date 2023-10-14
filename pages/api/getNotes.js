/* eslint-disable import/no-anonymous-default-export */
import conn from "../../config/db";
import { verifyToken } from "../../helpers";

export default async (req, res) => {
  const isVerified = await verifyToken(req.body.token);
  if (isVerified.status === 200) {
    const query = "SELECT * FROM notes WHERE id = $1";
    const values = [isVerified.decoded.userId];
    const result = await conn.query(query, values);
    res.status(200).json({ result });
  } else if (isVerified.status === 404) {
    res.status(404).json({ message: isVerified.message });
  } else if (isVerified.status === 400) {
    res.status(400).json({ message: isVerified.message });
  } else {
    res.status(500).json({ message: "Server error" });
  }
};
