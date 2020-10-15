const sqlite3 = require("sqlite3").verbose();

const express = require("express");


const app = express();

const Carro = require('./model/Carro');

const carro = new Carro();

app.use(express.static("public"));
app.use(express.json({ extended: false })); // <--- middleware configuration

app.listen(3000, () =>  {
  console.log("Server started (http://localhost:3000/) !");
});

app.get("/", (req, res) =>  {
  res.send ("Hello world...");
});

// crud carro


// criar
app.post("/carro", (req, res) =>  {
  const car = [req.body.Placa,req.body.Chassi,req.body.Renavam,req.body.Modelo,req.body.Marca,req.body.Ano];		
  carro.criar(car,res);
});

// listar
app.get("/carros", (req, res) => {
  carro.listar(res);
});

// buscar
app.get("/carro/:id", (req, res) => {
  const id = req.params.id;
  carro.buscar(id,res);
});

// atualizar
app.put("/carro/:id", (req, res) =>  {
  const id = req.params.id;
  const car = [req.body.Placa,req.body.Chassi,req.body.Renavam,req.body.Modelo,req.body.Marca,req.body.Ano,id];		
  carro.atualizar(car,res);
});


// deletar

app.delete("/carro/:id", (req, res) => {
  const id = req.params.id;
  carro.deletar(id,res);
});
