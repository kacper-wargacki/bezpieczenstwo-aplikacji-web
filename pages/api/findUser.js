import conn from "../../conifg/db";

export default async (req, res) => {
  try {
    const result = await conn.query(req.body.query);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Server error" });

    console.log(error);
  }
};
