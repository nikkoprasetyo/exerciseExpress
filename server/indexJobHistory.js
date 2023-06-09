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

app.get("/job_history", (req, res) => {
  pool.query("SELECT * FROM job_history", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.get("/job_history/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM job_history where employee_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.post("/job_history", (req, res) => {
  const { employee_id, job_id, department_id } = req.body;
  pool.query(
    "INSERT INTO job_id (employee_id, job_id, department_id) VALUES ($1, $2, $3)",
    [employee_id, job_id, department_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.put("/job_history/:id", (req, res) => {
  const { id } = req.params;
  const { job_id, department_id } = req.body;
  pool.query(
    "UPDATE job_history SET job_id = $2, department_id = $3 WHERE employee_id = $1",
    [id, job_id, department_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.delete("/job_history/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from job_history where employee_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});
