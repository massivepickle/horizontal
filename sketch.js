var canvas,gamestate=0,playercount=0,form,player,game;
var database, position;
var allPlayer;
var c1,c2,c3,c4,cars;
var anime,tracki,hurdle;
var jumping,ground,gravity = -0.7;

function preload(){
    anime = loadAnimation("styk.gif","styk1.gif","styk.gif");
    tracki = loadImage("track.png");
    hurdle = loadImage("hurdle.png")
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background("white");
    if(playercount === 4){
        game.update(1);
    }
    if(gamestate === 1){
        clear();
        game.play();
    }
    if(gamestate === 2){
        game.update(2);
        game.end();
    }
    drawSprites();
}