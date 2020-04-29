var PLAY=1;
var END=0;
var gameState=PLAY;
//playSound("sound://category_background/repitition.mp3", false);
var ground;
var player;
var player_img;
var itemGroup;
var ObstacleGroup;
var count=0;
var coin;

var background_img;
var coin_img;
var obstacle1,obstacle2,obstacle3;
var obstacle1_img,obstacle2_img,obstacle3_img

function preload(){
coin_img = loadImage("coin.png");
background_img = loadImage("Background1.jpg")
player_img = loadImage("Naruto 1.png");
obstacle1_img = loadImage("Robot6.png");
obstacle2_img = loadImage("Fire1.png");
obstacle3_img = loadImage("Enemy1.png");

}
function setup(){
  createCanvas(820,650);
  
   ground = createSprite(200,650,400,10);
 // ground.setAnimation(ground_img);
  ground.visible = false;

//ground.scale=2.0;
ground.x=ground.width/2;

 player = createSprite(50, 400,20,50);
player.addAnimation("player",player_img);
player.scale=0.5;
itemGroup=new Group();
 ObstacleGroup=new Group();

}




player.setCollider("circle",0,0,40);

function draw() {
   background(background_img);
  // background.addImage("background",background_img)
   //display score
   fill("purple");
   textSize(20);
   text("COINS:"+count,40,35);
   
 
   player.collide(ground);
   
    if(gameState===PLAY){
      ground.velocityX=-6;
      //count=Math.round(World.frameCount/6);
       if(ground.x<0){
      ground.x=ground.width/2;
    }
    player.velocityY=player.velocityY+0.8;
   
   
    if(keyDown("space")){
        player.velocityY =-10;
       }
   if(player.isTouching(itemGroup)){
     itemGroup.destroyEach();
    // playSound("sound://category_pop/cute_water_bubble.mp3");
     count=count+1;
     }
     if(player.isTouching(ObstacleGroup)){
       gameState=END;
       
     }
   coins();
   Obstacle();
  }
     else if(gameState===END){
       fill("purple");
       text("GAME OVER :(",370,320);
       textSize(40);
      // stopSound("sound://category_background/repitition.mp3");
       player.destroy();
      ground.velocityX=0;
      itemGroup.setVisibleEach(0);
     
     }
    createEdgeSprites();
  //  player.bounceOff(topEdge);
   // player.bounceOff(rightEdge);
   // player.bounceOff(leftEdge);
   // player.bounceOff(bottomEdge);
    drawSprites();
    }
function coins(){
 
  if(frameCount%52 === 0){
   var item=createSprite(202,357,40,10);
  var rand = Math.round(random(1,1));
    switch(rand) {
      case 1: item.addImage("coin.png",coin_img);
              break;
              break;
              break;
              break;
      
        }
           
   // item.addImage(coin_img);
    //item.setCollider("circle");
    item.scale=0.25;
    item.velocityX=-3;
   
    item.y=Math.round(random(440,470));
    item.lifetime=134;
    itemGroup.add(item);
     }
    }
   
  
function Obstacle(){
      if(frameCount%120===0){
    var obstacle=createSprite(400,605,10,10);
    obstacle.velocityX = -(6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage("obstacle1",obstacle1_img);
              break;
      case 2: obstacle.addImage("obstacle2",obstacle2_img);
              break;
      case 3: obstacle.addImage("obstacle3",obstacle3_img);
              break;
      
      default: break;
    }
    //obstacle.addImage(obstacle1_img);
    //obstacle.scale=0.5;
    obstacle.collide(ground);
    obstacle.velocityX=-6;
    ObstacleGroup.add(obstacle);
    obstacle.lifetime=70;
    obstacle.scale = 0.4;
  }
}
