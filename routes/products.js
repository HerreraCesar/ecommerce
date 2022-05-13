import { Router } from "express";
import { login } from "../middleware/login.js";
import { productsDao as products } from "../src/daos/index.js";
import uniqid from "uniqid";

const routerProducts = Router();

// RUTAS PÚBLICAS

routerProducts.get("/:id?", async (req, res) => {
  if (req.params.id) {
    let id = req.params.id;
    let data = await products.getById(id);
    res.send(data);
  } else {
    let data = await products.getAll();
    res.send(data);
  }
});

// RUTAS PRIVADAS

routerProducts.post("/", login, async (req, res) => {
  let timestamp = new Date(Date.now()).toLocaleString();
  let id = uniqid();
  let newProduct = { ...req.body, id, timestamp };
  let data = await products.add(newProduct);
  res.send(data);
});

routerProducts.put("/:id", login, async (req, res) => {
  let id = req.params.id;
  let updatedProduct = req.body;
  let data = await products.updateById(id, updatedProduct);
  res.send(data);
});

routerProducts.delete("/:id", login, async (req, res) => {
  let id = req.params.id;
  let data = await products.deleteById(id);
  res.send(data);
});

export default routerProducts;
