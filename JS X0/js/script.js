const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


const groundImg = new Image();
groundImg.src = "../JS X0/img/ground.png";

const crossImg = new Image();
crossImg.src = "../JS X0/img/X.png";

const zeroImg = new Image();
zeroImg.src = "../JS X0/img/0.png";

const mouse = {
    x: 0, 
    y: 0,
    left: false,
    over: false,
};

const field = [];
for (i = 0; i < 3; i++) field.push([0, 0, 0]);

var choice = true;

canvas.addEventListener("mouseenter", mouseenterHandler);
canvas.addEventListener("mousemove", mousemoveHandler);
canvas.addEventListener("mouseleave", mouseleaveHandler);
canvas.addEventListener("mousedown", mousedownHandler);
canvas.addEventListener("mouseup", mouseupHandler);

function mouseenterHandler(event){
    mouse.over = true;
}

function mousemoveHandler(event){
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
}

function mouseleaveHandler(event){
    mouse.over = false;
}

function mousedownHandler(event){
    if (event.buttons === 1) mouse.left = true;
}

function mouseupHandler(event){
    mouse.left = false;
}

function setX0(){
    let posI, posJ;
    posI = Math.floor(mouse.y / 200);
    posJ = Math.floor(mouse.x / 200);
    if (field[posI][posJ] == 0){
        if (choice) field[posI][posJ] = 1;
        else field[posI][posJ] = 2; 
        choice = !choice;
    }
}

function checkWin(){
    var win = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
        [[0, 0], [1, 1], [2, 2]]
    ];
    for (i = 0; i < win.length; i++){
        if (field[win[i][0][0]][win[i][0][1]] == field[win[i][1][0]][win[i][1][1]] &&
            field[win[i][0][0]][win[i][0][1]] == field[win[i][2][0]][win[i][2][1]] &&
             field[win[i][1][0]][win[i][1][1]] != 0)
            stopGame();
    }
}

function stopGame(){
    context.fillStyle = "red";
	context.font = "60px Arial";
    if (choice)
        context.fillText("Нолики выиграли!!!", 0, 300);
    else
        context.fillText("Крестики выиграли!!!", 0, 300);
    clearInterval(game);
}

function draw(){
    context.drawImage(groundImg, 0, 0);
    if (mouse.left) setX0();
    for (i = 0; i < 3; i++){
        for (j = 0; j < 3; j++){
            if (field[j][i] == 1) context.drawImage(crossImg, i*200, j*200);
            else if(field[j][i] == 2) context.drawImage(zeroImg, i*200, j*200);
        }
    }
    checkWin();
}

let game = setInterval(draw, 0);