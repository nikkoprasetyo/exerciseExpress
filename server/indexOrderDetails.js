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

app.get("/order_details", (req, res) => {
  pool.query("SELECT * FROM order_details", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

app.get("/order_details/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM order_details where ordet_order_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.post("/order_details", (req, res) => {
  const { ordet_order_id, ordet_prod_id, ordet_price, ordet_quantity } =
    req.body;
  pool.query(
    "INSERT INTO order_details (ordet_order_id, ordet_prod_id, ordet_price, ordet_quantity) VALUES ($1, $2, $3, $4)",
    [ordet_order_id, ordet_prod_id, ordet_price, ordet_quantity],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.put("/order_details/:id", (req, res) => {
  const { id } = req.params;
  const { ordet_price } = req.body;
  pool.query(
    "UPDATE order_details SET ordet_price = $2 WHERE ordet_order_id = $1",
    [id, ordet_price],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});

app.delete("/order_details/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "delete from order_details where ordet_order_id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.json(result);
    }
  );
});
