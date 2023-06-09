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

app.get("/locations", (req, res) => {
  pool.query("SELECT * FROM locations", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.get("/locations/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM locations where location_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.post("/locations", (req, res) => {
  const { location_id, street_address, postal_code, city, state_province } =
    req.body;
  pool.query(
    "INSERT INTO locations (location_id, street_address, postal_code, city, state_province) VALUES ($1, $2, $3, $4, $5)",
    [location_id, street_address, postal_code, city, state_province],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.put("/locations/:id", (req, res) => {
  const { id } = req.params;
  const { city } = req.body;
  pool.query(
    "UPDATE locations SET city = $2 WHERE location_id = $1",
    [id, city],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.delete("/locations/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from locations where location_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});
