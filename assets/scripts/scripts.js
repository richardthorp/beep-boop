//SESSION STORAGE BUTTONS
const withAudio = $("#audio-btn");
const onMute = $("#mute-btn");
const easy = $("#easy");
const normal = $("#normal");
const hard = $("#hard");

//GAME BUTTONS
const startBtn = $("#start");
const redBtn = $("#red");
const greenBtn = $("#green");
const orangeBtn = $("#orange");
const blueBtn = $("#blue");

//AUDIO FILES
const redAudio = new Audio("assets/audio/note-1.mp3");
const greenAudio = new Audio("assets/audio/note-2.mp3");
const orangeAudio = new Audio("assets/audio/note-3.mp3");
const blueAudio = new Audio("assets/audio/note-4.mp3");
const gameWinJingle = new Audio("assets/audio/success.mp3")
const gameFailJingle = new Audio("assets/audio/fail.mp3")

//GAME VARIABLES
let compOrder = [];
let userOrder = [];
let userTurn = false;
let compCount = 0;
let userCount = 0;
let level = 1;
let difficulty = sessionStorage.difficulty;
let audio;
let speed;
let winLimit;
let intervalID;
let levelDisplay = $("#level");

//USER CLICK HANDLERS
//Set session storage 
withAudio.click(function(){
    sessionStorage.setItem("audio", "true");
    });
  
onMute.click(function(){
    sessionStorage.setItem("audio", "false");
    });

easy.click(function(){
    sessionStorage.setItem("difficulty", "easy");
    });

normal.click(function(){
    sessionStorage.setItem("difficulty", "normal");
    });
    
hard.click(function(){;
    sessionStorage.setItem("difficulty", "hard");
    });

//Game button handlers
startBtn.click(startGame);
redBtn.click(red);
greenBtn.click(green);
orangeBtn.click(orange);
blueBtn.click(blue);

    
//GAME FUNCTIONS
//Start of new game
function startGame(){
    levelDisplay.text("LEVEL : 1");
    compOrder = [];
    userOrder = [];
    userTurn = false;
    compCount = 0;
    level = 1;
    switch (difficulty){
        case "easy":
            speed = 800;
            winLimit = 15;
            break;
        case "hard":
            speed = 500;
            winLimit = 2;
            break;
        default:
            speed = 600;
            winLimit = 20;

    };
    //Get random array to decide computer order
    for (let i = 0; i < winLimit; i++){
        compOrder.push(Math.floor(Math.random()* 4 + 1));
    };

    intervalID = setInterval(compPlay, speed);
};

//Computers turn
function compPlay(){

    userTurn = false;

    if(compCount === level){
        compCount = 0;
        clearInterval(intervalID);
        userTurn = true;
    };

    if(!userTurn){
        if(compOrder[compCount] === 1){
            avOutputs(redBtn, "btn-red", redAudio);
        };
        if(compOrder[compCount] === 2){
            avOutputs(greenBtn, "btn-green", greenAudio);
        };
        if(compOrder[compCount] === 3){
            avOutputs(orangeBtn, "btn-orange", orangeAudio);
        };
        if(compOrder[compCount] === 4){
            avOutputs(blueBtn, "btn-blue", blueAudio);
        };
        compCount++;
    };
};

//Trigger appropriate CSS classes and audio files
function avOutputs(btnVar, btnColorString , audioSample){
    btnVar.removeClass(btnColorString).addClass(btnColorString + "-active");
    setTimeout(function(){
        btnVar.removeClass(btnColorString + "-active").addClass(btnColorString);
    }, 200);

    if(sessionStorage.audio === "true" || !sessionStorage.audio){
        audioSample.play();
    };

};

//Trigger AV and push number to userOrder array
function red(){

    if(userTurn === true){
    userOrder.push(1);
    avOutputs(redBtn, "btn-red", redAudio);
    userCount++;
    checkOrder();
    };
};

function green(){

    if(userTurn === true){
    userOrder.push(2);
    avOutputs(greenBtn, "btn-green", greenAudio);
    userCount++;
    checkOrder();
    };
};

function orange(){

    if(userTurn === true){
    userOrder.push(3);
    avOutputs(orangeBtn, "btn-orange", orangeAudio);
    userCount++;
    checkOrder();
    };
};

function blue(){

    if(userTurn === true){
    userOrder.push(4);
    avOutputs(blueBtn, "btn-blue", blueAudio);
    userCount++;
    checkOrder();
    };
};

function checkOrder(){
    if(userOrder[userCount - 1] !== compOrder[userCount - 1]){
        loseGame();
    }
    if(userOrder.length === level){
        userTurn = false;

        if(userOrder[level -1] !== compOrder[level -1]){
        loseGame();
        }
        if(userOrder[level - 1] === compOrder[level - 1] && level < winLimit){
            userTurn = false;
            level++;
            userOrder = [];
            userCount = 0;
            levelDisplay.text(`LEVEL : ${level}`);
            setTimeout(function(){
            intervalID = setInterval(compPlay, speed);
            }, 1000);
        }
        if(userOrder[level - 1] === compOrder[level - 1] && level === winLimit){
            winGame();
        }
    };
};

let winGame = () => {
    setTimeout(flashLights, 200);
    let clearFlash = setInterval(flashLights, 1600);
    userTurn = false;
    levelDisplay.text("You win!");
    setTimeout(function(){
        clearInterval(clearFlash);
        levelDisplay.text("Press start");
    }, 4000);
    if(sessionStorage.audio === "true" || !sessionStorage.audio){
        setTimeout(function(){
            gameWinJingle.play();
        }, 500);
    };
};

let loseGame = () => {
    setTimeout(flashLights, 200);
    let clearFlash = setInterval(flashLights, 1600);
    userTurn = false;
    levelDisplay.text("Game over!");
    setTimeout(function(){
        clearInterval(clearFlash);
        levelDisplay.text("Press start");
    }, 4000);
    if(sessionStorage.audio === "true" || !sessionStorage.audio){
        setTimeout(function(){
            gameFailJingle.play();
        }, 500);
    };
};



function flashLights(){
    redBtn.removeClass("btn-red").addClass("btn-red" + "-active");
    setTimeout(function(){
    redBtn.removeClass("btn-red" + "-active").addClass("btn-red");
    }, 800);
    greenBtn.removeClass("btn-green").addClass("btn-green" + "-active");
    setTimeout(function(){
    greenBtn.removeClass("btn-green" + "-active").addClass("btn-green");
    }, 800);
    orangeBtn.removeClass("btn-orange").addClass("btn-orange" + "-active");
    setTimeout(function(){
    orangeBtn.removeClass("btn-orange" + "-active").addClass("btn-orange");
    }, 800);
    blueBtn.removeClass("btn-blue").addClass("btn-blue" + "-active");
    setTimeout(function(){
    blueBtn.removeClass("btn-blue" + "-active").addClass("btn-blue");
    }, 800);

};
