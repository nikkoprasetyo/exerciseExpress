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

app.get("/countries", (req, res) => {
  pool.query("SELECT * FROM countries", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.get("/countries/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM countries where country_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.post("/countries", (req, res) => {
  const { country_id, country_name, region_id } = req.body;
  pool.query(
    "INSERT INTO COUNTRIES (country_id, country_name, region_id) VALUES ($1, $2, $3)",
    [country_id, country_name, region_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.put("/countries/:id", (req, res) => {
  const { country_id, country_name, region_id } = req.body;
  pool.query(
    "UPDATE countries SET country_id = $1, country_name = $2, region_id = $3 WHERE country_id = $1",
    [country_id, country_name, region_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.delete("/countries/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from countries where country_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});
