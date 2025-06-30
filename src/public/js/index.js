let value = "";

let mc = 0;
let zag = 0;

window.onload = (event) => {
    fetch("http://localhost:3000/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("teamLogo").src = "imgs/" + data.team + ".png"
            document.getElementById("randomTeam").innerHTML = data.team;
        });
};

let errorElement = document.getElementById("error-msg");
document.getElementById("input").addEventListener("keyup", keyup);

function submitForm() {
    fetch("http://localhost:3000/submit", {
        method: "POST",
        body: JSON.stringify({
            name: value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 404) {
                errorElement.innerHTML = data.message;
                return;
            }

            const res = data.resultado;
            const p = res.position.toLowerCase();
            let idToUpdate = p;
            document.getElementById("input").value = ""

            if (p === "mc") {
                mc++;
                idToUpdate = `${p}_${mc}`;
            } else if (p === "zag") {
                zag++;
                idToUpdate = `${p}_${zag}`;
            }
            document.getElementById(
                idToUpdate
            ).innerHTML = `${res.name.toUpperCase()}`;
            document.getElementById(idToUpdate).style.backgroundColor = "#227C70";
            if(data.winGame == false){
                document.getElementById("randomTeam").innerHTML = data.team;
                document.getElementById("teamLogo").src = "imgs/" + data.team + ".png";
            }
            else{
                document.getElementById("randomTeam").innerHTML = "VOCÊ VENCEU!";
                document.getElementById("teamLogo").src = "imgs/trophy.png";
            }
            
        });
}

function keyup(e) {
    errorElement.innerHTML = "";
    value = e.target.value;

    if (e.keyCode === 13) {
        submitForm();
    }
}



async function resetAllData() {
    await fetch("http://localhost:3000/reset", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    location.reload();
}
