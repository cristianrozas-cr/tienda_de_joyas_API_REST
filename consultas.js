const { Pool } = require('pg')
const format = require('pg-format')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "12345",
    database: "joyas",
    allowExitOnIdle: true
});

const obtenerJoyas = async ({limit = 15, order_by = "stock_ASC" , page = 1}) => {

    const [campo, direccion] = order_by.split("_")
    const offset = (page - 1) * limit;
    let formattedQuery = format("SELECT * FROM inventario ORDER BY %s %s OFFSET %s LIMIT %s", campo, direccion, offset, limit)
    const { rows: inventario } = await pool.query(formattedQuery)
    return { total: inventario.length, results: inventario };
}

const obtenerJoyasPorFiltros = async ({precio_min, precio_max, categoria, metal}) => {

    let filtros = [];

    console.log("Filtros iniciales: ", filtros)

    if (precio_min) filtros.push(`precio >= ${precio_min}`)
    if (precio_max) filtros.push(`precio <= ${precio_max}`)
    if (categoria) filtros.push(`categoria = '${categoria}'`)
    if (metal) filtros.push(`metal = '${metal}'`)

    console.log("Filtros luego del push si es que existen parámetros: ", filtros)

    let consulta = "SELECT * FROM inventario"
    if (filtros.length > 0){
        filtros = filtros.join(" AND ")
        consulta += ` WHERE ${filtros}`
    }

    console.log("Array de Filtros luego de la consulta: ", filtros)

    console.log("Consulta: ", consulta)

    const { rows: inventario } = await pool.query(consulta)
    return inventario;

}

module.exports = { obtenerJoyas, obtenerJoyasPorFiltros }