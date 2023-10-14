/* eslint-disable import/no-anonymous-default-export */
import conn from "../../config/db";
import { verifyToken } from "../../helpers";

export default async (req, res) => {
  const isVerified = await verifyToken(req.body.token);
  console.log(isVerified);
  if (isVerified.status === 200) {
    if (isVerified.decoded.userType !== "admin") {
      res
        .status(400)
        .json({ message: "You are not authorized to perform this action" });
    } else {
      const query = "DELETE FROM notes";
      const result = await conn.query(query);
      res.status(200).json({ result: result.rows });
    }
  } else if (isVerified.status === 404) {
    res.status(404).json({ message: isVerified.message });
  } else if (isVerified.status === 400) {
    res.status(400).json({ message: isVerified.message });
  } else {
    res.status(500).json({ message: "Server error" });
  }
};
