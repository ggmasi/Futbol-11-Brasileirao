import "./connection.js"
import mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    team: String
})

const playerModel = mongoose.model("user", playerSchema)

// const newPlayer = 
// [
//     {
//         name: "messias",
//         position: "ZAG",
//         team: "Santos"
//     }

    
//   ]
     
// // // const addPlayers = new playerModel(newPlayer)

// // // const result = await addPlayers.save()

// const result = playerModel.collection.insert(newPlayer, function(err, docs){
//     if(err){
//         return console.error(err);
//     } else{
//         console.log("Okay");
//     }
// });

// console.log(result)


export default playerModel