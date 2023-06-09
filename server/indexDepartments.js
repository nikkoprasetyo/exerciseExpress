import dotenv from "dotenv";
import express from "express";

dotenv.config();

const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "enigma580",
  database: "hr-db",
  port: 5432,
});

const app = express();

app.use(express.json()); //body parser
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/departments", (req, res) => {
  pool.query("SELECT * FROM departments", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.get("/departments/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM departments where department_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.post("/departments", (req, res) => {
  const { department_id, department_name, location_id } = req.body;
  pool.query(
    "INSERT INTO departments (department_id, department_name, location_id) VALUES ($1, $2, $3)",
    [department_id, department_name, location_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.put("/departments/:id", (req, res) => {
  const { id } = req.params;
  const { department_name } = req.body;
  pool.query(
    "UPDATE departments SET department_name = $2 WHERE department_id = $1",
    [id, department_name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.delete("/departments/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from departments where department_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});
