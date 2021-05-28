const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;

var myEngine,myWorld;
var bg;
var ground;
var tank;
var turret;
var rotatedDegrees;
 var ball1,ball2,ball3,ball4,ball5;
 var bullet,bullets;
var balls=[];

 function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

function preload(){
bg=loadImage("background.png")

}
function setup()
{
    createCanvas(800,400);
    myEngine=Engine.create();
    myWorld=myEngine.world;


    ground=new Ground(600,390,1200,30)
    tank=new Tank(600,340,200,75)
    turret=new Turret(550,320,100,20)
    // ball1=new Ball(50,1500,15)
    // ball2=new Ball(100,-450,10)
    // ball3=new Ball(100,-1000,5)
    // ball4=new Ball(50,50,20)
    // ball5=new Ball(150,-80,10)
     rotatedDegrees=0;
    bullets=[];

for(var c=0;c<5;c++)
{
  balls.push(new Ball(random(50,150),random(-1000,10),10,20));
}

}
function draw()
{
    background(bg);
    Engine.update(myEngine);
    tank.display();
    ground.display();
    turret.display();
    // ball1.display();
    // ball2.display();
    // ball3.display();
    // ball4.display();
    // ball5.display();
     if(keyDown(UP_ARROW) && rotatedDegrees<70)
    {
    
        turret.rotateUp();
        rotatedDegrees++;
    }  
    if(keyDown(DOWN_ARROW)&& rotatedDegrees >-25)
    {
//        console.log(rotatedDegrees);
        turret.rotateDown();
        rotatedDegrees--;
    }
    
    //To show Bullets on the screen
    for(var x = 0; x < bullets.length; x++)
    {
      if(bullets[x].body.position.y > 365)
      {
          Matter.World.remove(myWorld, bullets[x].body);
      }
      else
      {
          bullets[x].display();
      }
    }
  

    //To show random balls on the screen
    for(var i=0;i<5;i++)
    {
      balls[i].display();
     
    }


    
      //
   // text(mouseX+" "+mouseY,mouseX,mouseY);

}


function keyPressed()
{
      if(keyCode === 32)
      {
        var speed = baseClamp(rotatedDegrees/5, 4, 10);
        bullet = new Bullet(0, 0, 30, 10, rotatedDegrees, speed);
        Matter.Body.setPosition(bullet.body, {x: turret.body.position.x - 50, y: turret.body.position.y - rotatedDegrees/3});
        bullets.push(bullet);
    }
}
