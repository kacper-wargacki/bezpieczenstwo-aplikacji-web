/* eslint-disable import/no-anonymous-default-export */
import jwt from "jsonwebtoken";

export default async (req, res) => {
  console.log(req.body)
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET)
    if(!decoded)
    {
        res.status(400).json({message: "Wrong token"})
    } else if (decoded.exp < Math.floor(Date.now()/1000)) {
        res.status(400).json({message: "Token expired, please login again"})
    } else {
        res.status(200).json({ message: "Token OK" });
    }
  } catch (error) {
    res.status(400).json({ message: "Token verification error", error });
    console.log(error);
  }
};
