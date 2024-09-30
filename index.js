//Importar módulos
const express = require('express')
const cors = require('cors')


//Importar funciones
const { obtenerJoyas, obtenerJoyasPorFiltros } = require('./consultas')

//Levantar el servidor
const PORT = 3000;
const app = express();
app.listen(PORT, console.log("Puerto encendido"));

//Middleware
app.use(express.json());
app.use(cors());


//Rutas
app.get("/joyas", async (req, res) => {
    try {
        const queryStrings = req.query;
        const joyas = await obtenerJoyas(queryStrings)
        res.json(joyas)
    } catch (error) {
        res.json(error)
    }
})

app.get("/joyas/filtros", async (req, res) => {
    try{
        const queryStrings = req.query;
        const joyasFiltradas = await obtenerJoyasPorFiltros(queryStrings)
        res.json(joyasFiltradas)
    } catch (error) {
        res.json(error)
    }
})