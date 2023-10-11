import conn from "../../conifg/db";

export default async (req, res) => {
  try {
    const query = "SELECT * FROM notes WHERE id = $1";
    const values = [req.body.id];
    const result = await conn.query(query, values);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Server error" });

    console.log(error);
  }
};
