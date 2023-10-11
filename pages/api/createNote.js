import conn from "../../conifg/db";

export default async (req, res) => {
  try {
    console.log(req.body, typeof req.body.id);
    const query = "INSERT INTO notes(id, note) VALUES($1, $2)";
    const values = [req.body.id, req.body.note];
    const result = await conn.query(query, values);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Server error" });

    console.log(error);
  }
};
