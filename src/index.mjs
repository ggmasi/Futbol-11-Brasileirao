import express from "express"
import routes from "./public/js/routes.js"
import { engine } from "express-handlebars"

const server = express()
// server.use(express.static('C:/Users/ggmas/Desktop/webSGFolder/TCC_BackEnd_Fase07/Server'+'/public'))
// server.use(express.static('C:/Users/ggmas/Desktop/webSGFolder/TCC_BackEnd_Fase07/Server/views'))
server.engine("html", engine({defaultLayout: false}))

server.set("view engine", "html")
server.set("views", "./src/views")

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static("./src/public"))

server.use(routes)

server.listen(3000, function() {
    console.log("SERVER IS ON!")
})




// export async function FindPostByName(nome){
    
//     const post = await playerModel.find({name: nome})
//     console.log(post)
// }

// playerModel.exists({name: "Maicon"}, function(err, doc) {
//     if (err) {
//       console.log(err)
//     }else{
//       console.log("Result:", doc)
//     }
// })

// const newPlayer = 
//     [
//         {
           
//           name:"Bruninho",
//           position:"MC",
//           team: "Santos"
//         },
//         {
           
//           name: "Zanocelo",
//           position: "MC",
//           team: "Santos"
//         }
       
//     ]
     


// // const result = await newPlayer.save()
// const result = playerModel.collection.insert(newPlayer, function(err, docs){
//     if(err){
//         return console.error(err);
//     } else{
//         console.log("Okay");
//     }
// });

// console.log(result)