/* eslint-disable import/no-anonymous-default-export */
import conn from "../../config/db";

export default async (req, res) => {
  try {
    const query = "DELETE FROM notes";
    const result = await conn.query(query);
    res.status(200).json({ result: result.rows });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};
