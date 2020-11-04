
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload() {
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400)
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  FoodGroup = createGroup();
  ObstacleGroup = createGroup();
  
  monkey = createSprite(80, 315, 20, 20)
  monkey.addAnimation("monkey", monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(400, 350, 900, 10)
  ground.velocityX = -4
  ground.x = ground.width/2
  console.log(ground.x)
  ground.visible = true;
  
}

  
function draw() {
  background(255);
  
  spawnBananas();
  spawnObstacles();
  
   if (ground.x < 0){
     ground.x = ground.width/2;
   }
   
  if(keyDown("space") && monkey.y>300) {
     monkey.velocityY = -12
  }
  
  if(monkey.isTouching(ObstacleGroup)) {
    monkey.velocityY = 0
    ground.velocityX = 0
    
    ObstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0)
    
    ObstacleGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1)
    
  }
    
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground)
  
  
  var survivalTime = 0
  
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100, 50)
  
  
  drawSprites();
}

function spawnBananas() {
 if (frameCount % 80 === 0){
   banana = createSprite(400, 100)
   banana.y = Math.round(random(120, 200));
   banana.addImage(bananaImage);
   banana.scale = 0.1;
   banana.velocityX = -3;
   
   banana.lifetime = 200;
   FoodGroup.add(banana);
   
 }
}

function spawnObstacles() {
 if (frameCount % 80 === 0){
   obstacle = createSprite(400, 320)
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -3;
   
   obstacle.lifetime = 200;
   ObstacleGroup.add(obstacle);
   
 }
}

