import express from "express";
import Model from "../../db/model.js";
import jsdom from "jsdom";

// const {JSDOM} = jsdom;

const routes = express.Router();
// global.document = new JSDOM("/views/home.handlebars").window.document

var teams = [
    "América-MG",
    "Athletico",
    "Atlético-MG",
    "Bahia",
    "Botafogo",
    "Red Bull Bragantino",
    "Corinthians",
    "Coritiba",
    "Cruzeiro",
    "Cuiabá",
    "Flamengo",
    "Fluminense",
    "Fortaleza",
    "Goiás",
    "Grêmio",
    "Internacional",
    "Palmeiras",
    "Santos",
    "São Paulo",
    "Vasco da Gama",
];
let canCA = true;
let canPE = true;
let canPD = true;
let canMC = true;
let canZAG = true;
let canLE = true;
let canLD = true;
let canGOL = true;
let MCcount = 0;
let ZAGcount = 0;
var team = "";
var winGame = false;

function resetData() {
    teams = [
        "América-MG",
        "Athletico",
        "Atlético-MG",
        "Bahia",
        "Botafogo",
        "Red Bull Bragantino",
        "Corinthians",
        "Coritiba",
        "Cruzeiro",
        "Cuiabá",
        "Flamengo",
        "Fluminense",
        "Fortaleza",
        "Goiás",
        "Grêmio",
        "Internacional",
        "Palmeiras",
        "Santos",
        "São Paulo",
        "Vasco da Gama",
    ];
    canCA = true;
    canPE = true;
    canPD = true;
    canMC = true;
    canZAG = true;
    canLE = true;
    canLD = true;
    canGOL = true;
    MCcount = 0;
    ZAGcount = 0;
    team = "";
    winGame = false;
}

routes.get("/", async function (req, res) {
    res.json({ team: randomTeam() });
    
});

routes.get("/reset", async function (req, res) {
    resetData();

    res.status(204).json({});
});

routes.get("/home", async function (req, res) {
    res.render("home.html");
    resetData();
});

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

function randomTeam() {
    if (
        !canCA &&
        !canPE &&
        !canPD &&
        !canMC &&
        !canZAG &&
        !canLE &&
        !canLD &&
        !canGOL
    ) {
        console.log("YOU WIN!!");
        return;
    } else {
        team = teams[Math.floor(Math.random() * teams.length)];
        teams.splice(teams.indexOf(team), 1);
        console.log(team)
        return team;
    }
}

function winTheGame(){
    if(!canCA && !canPE && !canPD && !canMC && !canZAG && !canLE && !canLD && !canGOL){
        console.log("YOU WIN!!");
        winGame = true;
        return;
    }
}

routes.post("/submit", async function (req, res) {
    const { name } = req.body;

    Model.findOne({ name: name.toLowerCase(), team: team })

        .then(function (resultado) {
            // Model.find({name: name})

            if (resultado) {
                console.log("result: ", resultado);
                // res.json(resultado)
            } else {
                res.status(404).json({
                    status: 404,
                    message: "Jogador não encontrado",
                });
                return;
            }

            if (resultado.position == "CA" && canCA) {
                canCA = false;
                winTheGame();
                sendUpdate(res, resultado);
            } else if (resultado.position == "CA" && !canCA) {
                console.log("canCA is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }

            if (resultado.position == "PD" && canPD) {
                canPD = false;
                winTheGame();
                sendUpdate(res, resultado);
            } else if (resultado.position == "PD" && !canPD) {
                console.log("canPD is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }

            if (resultado.position == "PE" && canPE) {
                canPE = false;
                winTheGame();
                sendUpdate(res, resultado);
            } else if (resultado.position == "PE" && !canPE) {
                console.log("canPE is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }

            if (resultado.position == "LE" && canLE) {
                canLE = false;
                winTheGame();
                sendUpdate(res, resultado);
            } else if (resultado.position == "LE" && !canLE) {
                console.log("canLE is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }

            if (resultado.position == "LD" && canLD) {
                canLD = false;
                winTheGame();
                sendUpdate(res, resultado);
            } else if (resultado.position == "LD" && !canLD) {
                console.log("canLD is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }

            if (resultado.position == "GOL" && canGOL) {
                canGOL = false;
                sendUpdate(res, resultado);
                winTheGame();
            } else if (resultado.position == "GOL" && !canGOL) {
                console.log("canGOL is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }

            if (resultado.position == "MC" && canMC) {
                MCcount++;
                winTheGame();
                sendUpdate(res, resultado);
                if (MCcount == 3) {
                    canMC = false;
                }
            } else if (resultado.position == "MC" && !canMC) {
                console.log("canMC is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }

            if (resultado.position == "ZAG" && canZAG) {
                ZAGcount++;
                winTheGame();
                sendUpdate(res, resultado);
                if (ZAGcount == 2) {
                    canZAG = false;
                }
            } else if (resultado.position == "ZAG" && !canZAG) {
                console.log("canZAG is false");
                res.status(404).json({
                    status: 404,
                    message: "Esta posição já está ocupada",
                });
                return;
            }
        })

        .catch(function (erro) {
            console.log(erro.message);
            res.sendStatus(500);
        });
});

function sendUpdate(res, resultado) {
    res.status(200).json({
        status: 200,
        resultado: resultado,
        team: randomTeam(),
        winGame: winGame,
    });
}

export default routes;
