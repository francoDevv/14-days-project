const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

let products = [
    {id: 1, name: 'Peine', price: 10000, stock: 20},
    {id: 2, name: 'Collar', price: 7500, stock: 50},
    {id: 3, name: 'Anillo', price: 5000, stock: 30}
];

app.get("/", (req, res) => {
    res.send("API funcionando, Te amo sofita, prueba");
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.post("/products", (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    }

    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    
})