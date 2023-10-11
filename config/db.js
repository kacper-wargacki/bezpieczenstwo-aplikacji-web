import { Pool } from "pg";

let conn = new Pool({
  host: "db.kohvrfqsmkkpeqwnmxyw.supabase.co",
  user: "postgres",
  password: "Zp7qJdyzAun60Do",
  database: "postgres",
  port: 5432,
});

// let conn = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "postgres",
//   database: "owasp",
//   port: 5432,
// });

export default conn;
