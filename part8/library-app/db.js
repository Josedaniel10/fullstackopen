const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const connectToDataBase = async (uri) => {
    console.log('connecting to database URI:', uri)

    try {
        await mongoose.connect(uri)
        console.log("Conectado a la Base de datos")
    } catch (error) {
        console.error("Error: Ocurrio un fallo al conectarse a la db", error)
        process.exit(1)
    }
}

module.exports = connectToDataBase