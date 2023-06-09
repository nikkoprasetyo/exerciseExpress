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

app.get("/jobs", (req, res) => {
  pool.query("SELECT * FROM jobs", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM jobs where job_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.post("/jobs", (req, res) => {
  const { job_id, job_title, min_salary, max_salary } = req.body;
  pool.query(
    "INSERT INTO jobs (job_id, job_title, min_salary, max_salary) VALUES ($1, $2, $3, $4)",
    [job_id, job_title, min_salary, max_salary],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.put("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { max_salary } = req.body;
  pool.query(
    "UPDATE jobs SET max_salary = $2 WHERE job_id = $1",
    [id, max_salary],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.delete("/jobs/:id", (req, res) => {
  const { id } = req.params;
  pool.query("delete from jobs where jobs_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});
