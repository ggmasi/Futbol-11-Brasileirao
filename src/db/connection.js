import mongoose from "mongoose"

const address = "mongodb+srv://admin:sJEc5I1cccFX7HfK@fbr11.xtlryfc.mongodb.net/?retryWrites=true&w=majority"
const cfg = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(address, cfg)

.then(function(resultado) {
    if (resultado) {
        //console.log(resultado)
        console.log("CONECTADO")
    }
    else {
        console.log("Problema ao conectar")
    }
})

.catch(function(erro) {
    console.log(erro.message)
})