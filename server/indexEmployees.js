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

app.get("/employees", (req, res) => {
  pool.query("SELECT * FROM employees", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.get("/employees/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM employees where employee_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.post("/employees", (req, res) => {
  const { employee_id, first_name, last_name } = req.body;
  pool.query(
    "INSERT INTO employees (employee_id, first_name, last_name) VALUES ($1, $2, $3)",
    [employee_id, first_name, last_name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;
  pool.query(
    "UPDATE employees SET first_name = $2, last_name = $3 WHERE employee_id = $1",
    [id, first_name, last_name],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from employees where employee_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});
