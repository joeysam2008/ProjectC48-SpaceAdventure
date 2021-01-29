const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint

var rocket, rocketImg;
var asteroid, asteroidImg;
var space, spaceImg;
var gold, goldImg;
var score = 0;
// var START;
// var PLAY;
// var END;
// var gameState = "START";

function preload(){
    rocketImg = loadImage("Images/Rocket.png")
    asteroidImg = loadImage("Images/asteroid1.png")
    spaceImg = loadImage("Images/Spaceimg.jpg")
    goldImg = loadImage("Images/coin.png")
}

function setup(){
    canvas = createCanvas(900,600)
    
    space = createSprite(200,200,100,100)
    space.addImage(spaceImg)
    space.velocityY = 3

    rocket = createSprite(400,300,10,10)
    rocket.addImage(rocketImg)
    rocket.scale = 0.2

    asteroidGroup = new Group;
    goldGroup = new Group;
    
}

function draw(){
    background("white")
    
    if(space.y > 400){
        space.y = 300
    }        

        rocket.bounceOff(asteroidGroup)

        if(keyIsDown(RIGHT_ARROW)){
            rocket.x += 10
        }

        if(keyIsDown(LEFT_ARROW)){
            rocket.x -= 10
        }

        if(keyIsDown(32)){
            rocket.velocityY -= 1
        }

        rocket.velocityY = rocket.velocityY + 0.6

        if(rocket.y > 600 || rocket.y < 0){
            reset();
        }

        if(rocket.isTouching(goldGroup)){
            goldGroup.destroyEach()
            score += 2
        }
        

        spawnAsteroids()
        spawnGold()
    

   drawSprites(); 

   stroke("white")
   fill("white")
   textSize(20)
   text("Score:"+ score,30,70);

    // if(gameState === "START"){
        stroke("white")
        fill("white")
        textSize(20)
        text("Press Space Key to Move the rocket. Click on left & right arrow keys to change direction!", 30,90)
    //}

}

function spawnAsteroids(){

    if(frameCount%30 === 0){
        asteroid = createSprite(200,100,10,10);
        asteroid.addImage(asteroidImg);
        asteroid.scale = 0.05
        asteroid.velocityY = 3
        asteroid.x = Math.round(random(50,800));
        asteroid.y = Math.round(random(20,400));
        
        asteroid.lifetime = 300
        asteroid.depth = space.depth+1
        asteroidGroup.add(asteroid)
    }
}

function spawnGold(){

    if(frameCount%20 === 0){
        gold = createSprite(200,100,10,10);
        gold.addImage(goldImg);
        gold.scale = 0.05
        gold.velocityY = 3
        gold.x = Math.round(random(50,800));
        gold.y = Math.round(random(20,400));
        
        gold.lifetime = 300
        gold.depth = space.depth+1
        goldGroup.add(gold)
        
    }
}

function reset(){
    rocket.x = 400;
    rocket.y = 400;
}