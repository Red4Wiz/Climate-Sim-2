var canvas = document.getElementById("reaction-simulation");
if (canvas.getContext) var ctx = canvas.getContext("2d"); else alert("Canvas element is not available");

var width = canvas.width;
var height = canvas.height;

var synCol = "white";
var decCol = "white";
var sDisCol = "white";
var dDisCol = "white";
var cComCol = "white";
var iComCol = "white";


var sceneNo = 1;

var animate1 = false;

var bg1 = new Image();
bg1.src = "assets/chemBG.png";

var bg2 = new Image();
bg2.src = "assets/labBG.jpg";

var play = new Image();
play.src = "assets/play.png"

var back = new Image();
back.src = "assets/backarrow.png"

var pause = new Image();
pause.src = "assets/pause.png"


//returns the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Binding the click event on the canvas
canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if(sceneNo == 0){
        if(isInside(mousePos, synthesis)){
            synCol = "rgb(217, 219, 218)";
        }else{
            synCol = "white";
        }

        if(isInside(mousePos, decomposition)){
            decCol = "rgb(217, 219, 218)";
        }else{
            decCol = "white";
        }

        if(isInside(mousePos, sDisplace)){
            sDisCol = "rgb(217, 219, 218)";
        }else{
            sDisCol = "white";
        }

        if(isInside(mousePos, dDisplace)){
            dDisCol = "rgb(217, 219, 218)";
        }else{
            dDisCol = "white";
        }

        if(isInside(mousePos, cCombustion)){
            cComCol = "rgb(217, 219, 218)";
        }else{
            cComCol = "white";
        }

        if(isInside(mousePos, iCombustion)){
            iComCol = "rgb(217, 219, 218)";
        }else{
            iComCol = "white";
        }
    }


}, false);

canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if(sceneNo == 0){
        if(isInside(mousePos, synthesis)){
            sceneNo = 1;
        }

        else if(isInside(mousePos, decomposition)){
            sceneNo = 2;
        }

        else if(isInside(mousePos, sDisplace)){
            sceneNo = 3;
        }

        else if(isInside(mousePos, dDisplace)){
            sceneNo = 4;
        }

        else if(isInside(mousePos, cCombustion)){
            sceneNo = 5;
        }

        else if(isInside(mousePos, iCombustion)){
            sceneNo = 6;
        }
    }
    else if(sceneNo == 1){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == false){
            animate1 = true;
        }
        else if(isInside(mousePos, playButton) && animate1 == true){
            animate1 = false;
        }
    }
    else if(sceneNo == 2){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == false){
            animate1 = true;
        }
        else if(isInside(mousePos, playButton) && animate1 == true){
            animate1 = false;
        }
    }
    else if(sceneNo == 3){
        if(isInside(mousePos, backButton)){
            sceneNo = 0;
        }
        if(isInside(mousePos, playButton) && animate1 == false){
            animate1 = true;
        }
        else if(isInside(mousePos, playButton) && animate1 == true){
            animate1 = false;
        }
    }

}, false);


function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}


var playButton = {
    x:1050,
    y:25,
    width:100,
    height:100
};

var backButton = {
    x:50,
    y:25,
    width:100,
    height:100
};

//6 objects to hold the 6 different animations
var synthesis = {
    x:112,
    y:250,
    width:250,
    height:125
};

var decomposition = {
    x:474,
    y:250,
    width:250,
    height:125
};

var sDisplace = {
    x:836,
    y:250,
    width:250,
    height:125
};

var dDisplace = {
    x:112,
    y:465,
    width:250,
    height:125
};

var cCombustion ={
    x:474,
    y:465,
    width:250,
    height:125
};

var iCombustion = {
    x:836,
    y:465,
    width:250,
    height:125
};

function drawBox(rect, col, name1, name2, type){
    ctx.fillStyle = col;
    ctx.roundRect(rect.x,rect.y,rect.width,rect.height,10);
    ctx.fill();
    ctx.beginPath();

    if(type == 1){
        ctx.fillStyle = "black";
        ctx.fillText(name1, rect.x+(rect.width/2), rect.y+(rect.height/2), rect.width);
    }
    else{
        ctx.fillStyle = "black";
        ctx.fillText(name1, rect.x+(rect.width/2), rect.y+(rect.height/4)+10, rect.width);
        ctx.fillText(name2, rect.x+(rect.width/2), rect.y+(rect.height/4*3)-10, rect.width);
    }
    ctx.closePath();

}

function drawBg(){
    ctx.drawImage(bg1, 0, 0);
    ctx.fillStyle = "rgb(255, 255, 255, 0.6)";
    ctx.fillRect(0,0,width,height);
}

function drawSim(animate){
    ctx.drawImage(bg2, 0, 0);
    ctx.fillStyle = "rgb(255, 255, 255, 0.6)";
    ctx.fillRect(0,0,width,height);

    if(animate){
        ctx.drawImage(pause, playButton.x, playButton.y);
    }
    else{
        ctx.drawImage(play, playButton.x, playButton.y);
    }
    
    ctx.drawImage(back, backButton.x, backButton.y);
}


class Molecule{
    constructor(x, y, radius, name){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "white";
        this.speed = 3;
        this.name = name;
    }

    draw(){
        //ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.font = "38px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.name, this.x, this.y);

    }

    update(){
        this.draw();
        this.x += this.speed;
        
    }
}


var circle = {
    centerX:250, 
    centerY:250, 
    radius:125, 
    angle:0
}



//Synthesis Objects
let hydrogen1 = new Molecule(200, 350, 50, "H");
let hydrogen2 = new Molecule(200, 425, 50, "H");
let chlorine1 = new Molecule(400, 350, 50, "Cl");

function animate(){
    window.requestAnimationFrame(animate);

    if(sceneNo == 0){
        drawBg(bg1);

        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Chemical Reactions Simulator", canvas.width/2, 125);
        
        ctx.font = "38px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        //drawing the buttons to move to different animation
        drawBox(synthesis, synCol, "Synthesis", "", 1);
        drawBox(decomposition, decCol, "Decomposition", "", 1)
        drawBox(sDisplace, sDisCol, "Single", "Displacement", 2);
        drawBox(dDisplace, dDisCol, "Double", "Displacement", 2);
        drawBox(cCombustion, cComCol, "Complete", "Combustion", 2);
        drawBox(iCombustion, iComCol, "Incomplete", "Combustion", 2);


    }
    else if(sceneNo == 1){
        drawBg(bg2);
        ctx.fillStyle = "black";
        drawSim(animate1);

        ctx.font = "60px ChalkFont";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Synthesis Reaction", canvas.width/2, 75);
        hydrogen1.draw();
        hydrogen2.draw();   

        if(animate1){
            hydrogen1.update();
            hydrogen2.update();
        }   

        chlorine1.draw();
        let chlorine2 = new Molecule(400, 425, 50, "Cl");
        chlorine2.draw();

        if(hydrogen1.x > width){
            hydrogen1.x = 0;
            hydrogen2.x = 0;
        }

        //updateMol();

    }
    else if(sceneNo == 2){
        drawSim(animate1);
    }
    else if(sceneNo == 3){
        drawSim(animate1);
    }
    else if(sceneNo == 4){
        drawBg(bg2);
        
    }
    else if(sceneNo == 5){
        drawBg(bg2);

    }
    else if(sceneNo == 6){
        drawBg(bg2);

    }

}

animate();
