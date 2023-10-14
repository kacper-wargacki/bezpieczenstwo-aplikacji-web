/* eslint-disable import/no-anonymous-default-export */
import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      res.status(404).json({ message: "Token verification error" });
    } else if (decoded.exp < Math.floor(Date.now() / 1000)) {
      res.status(400).json({ message: "Token expired, please login again" });
    }
    // else if (req.body.token) {}
    else {
      res.status(200).json({ message: "Token OK" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
};
