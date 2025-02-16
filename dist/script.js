
// variable here
const win=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
]
let winposition=[0,0,0];
let turnX=true;
let playBoo=false;
let drawBoo=false;
let winBoo=false;
let mute=false;
let retapCount=0;

// musics & sfx
const themesfx=new Audio("assets/res/bgm.mp3");
const butoonsfx=new Audio("assets/res/button.mp3");
const tapsfx=new Audio("assets/res/tap.mp3");
const nopesfx=new Audio("assets/res/nope.mp3");
const drawsfx=new Audio("assets/res/draw.mp3");
const winsfx=new Audio("assets/res/win.wav");

// html access here
const box=document.querySelectorAll(".box");
const msg=document.querySelector(".msg");
const contSec=document.getElementById("cont-sec");
const volumeBtnI=document.getElementById("volume-btn-i");

const playBtn=document.getElementById("play-btn");
const restartBtn=document.getElementById("restart-btn");
const volumeBtn=document.getElementById("volume-btn");

//Gameplay here
window.addEventListener('load',()=>{
    themesfx.play();
    themesfx.loop=true;
})
for (const element of box) {
    playBtn.addEventListener('click',()=>{
        butoonsfx.play();
        playBoo=true;
        play();
    })
    restartBtn.addEventListener('click',()=>{
        butoonsfx.play();
        restart();
    })
    volumeBtn.addEventListener('click',()=>{
        butoonsfx.play();
        if(mute){
            volumeBtnI.classList.replace("fa-volume-xmark","fa-volume-high");
            themesfx.play();
            mute=false;
        }else{
            volumeBtnI.classList.replace("fa-volume-high","fa-volume-xmark");
            themesfx.pause();
            mute=true;
        }
    })
    element.addEventListener('click',(event)=>{
        if(drawBoo){
            restart();
            drawBoo=false;
        }else{
            nopePlay(element.id)
        }
        if(winBoo){
            restart();
        }
        turnX?showX(element):showO(element);
        winCheck();
        !winBoo?gameDrawCheck():"";
    });
    
}


//ALL functions here
function nopePlay(id){
    if(retapCount===id){
        nopesfx.play();
    }
    retapCount=id;
}
function play(){
    themesfx.volume="0.3";
    contSec.classList.replace("hidden","grid");
    turnShow();
    restart();
}
function restart(){
    for (const element of box) {
        element.children[0].style.display="none";
        element.children[0].style.opacity="0%";
        element.children[1].style.display="none";
        element.children[1].style.opacity="0%";
        element.setAttribute("name","-");
        if(winBoo){
            box[winposition[0]].classList.toggle("animate-box");
            box[winposition[1]].classList.toggle("animate-box");
            box[winposition[2]].classList.toggle("animate-box");
            winBoo=false;
        }
        // element.style.backgroundColor="white"
        drawBoo=false;
        retapCount=0;
    }
    turnShow();
}
function showX(element){
    if(element.getAttribute("name")==="-"){
        tapsfx.play();
        element.children[0].style.display="block";
        element.children[0].style.opacity="100%";
        element.children[1].style.display="none";
        element.setAttribute("name","x");
        turnX=false;
        turnShow();
        retapCount=0;
    }
    
}
function showO(element){
    if(element.getAttribute("name")==="-"){
        tapsfx.play();
        element.children[1].style.display="block";
        element.children[1].style.opacity="100%";
        element.children[0].style.display="none";
        element.setAttribute("name","o");
        turnX=true;
        turnShow();
        retapCount=0;
    }
    
}
function  turnShow(){
    turnX?msg.children[0].innerText="Turn X":msg.children[0].innerText="Turn O";
}
function gameDrawCheck(){
    for (const element of box) {
        if(element.getAttribute("name")==="-"){return;}
    }
    msg.children[0].innerText="Game Draw!";
    drawsfx.play();
    drawBoo=true;
}

function winCheck(){
    win.forEach(element => {
        // console.log(box[element[0]].getAttribute("name"))
        if(box[element[0]].getAttribute("name")==="x"&&
            box[element[0]].getAttribute("name")===box[element[1]].getAttribute("name")&&
            box[element[1]].getAttribute("name")===box[element[2]].getAttribute("name"))
            {
                msg.children[0].innerText="X win"
                winAnima(element);
                
            } else if(box[element[0]].getAttribute("name")==="o"&&
            box[element[0]].getAttribute("name")===box[element[1]].getAttribute("name")&&
            box[element[1]].getAttribute("name")===box[element[2]].getAttribute("name"))
            { 
                msg.children[0].innerText="O win"
                winAnima(element);
            }
        });
    }
    
function winAnima(element){
    winsfx.play();
    winBoo=true;
    box[element[0]].classList.toggle('animate-box');
    box[element[1]].classList.toggle('animate-box');
    box[element[2]].classList.toggle('animate-box');
    winposition[0]=element[0]
    winposition[1]=element[1]
    winposition[2]=element[2]
}

