import conn from "../../conifg/db";

export default async (req, res) => {
  try {
    const query = "INSERT INTO users(username, password) VALUES($1, $2)";
    const values = [req.body.username, req.body.password];
    const result = await conn.query(query, values);
    res.status(200).json({ result });
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error);
  }
};
