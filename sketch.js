let points =[[3,12],[0,11],[-4,7.5],[-9,7],[-15,5],[-13,3],[-11,2],[-9,2],[-7,1],[-3,-3],[-4,0],[-2,-0.5],[3,-1],[8,-3],[9,-5],[8,-8],[1,-11],[7,-10],[11,-14],[9,-10],[13,-7],[14,-2],[12,2],[7,5],[0,7],[3,12],[0,11],[-4,7.5],[-9,7]];


var fill_colors = "00296b-003f88-00509d-fdc500-ffd500".split("-").map(a=>"#"+a)
var line_colors = "064789-427aa1-ebf2fa-679436-a5be00".split("-").map(a=>"#"+a)
// +++++++++++++++++++++++++
var ball //"目前要處理的物件，暫時放在ball變數內"
var balls=[] //把產生的"所有"的物件，為物件的倉庫，所有物件資料都在此
// +++++++++++++++++++++++++++++++++++
var bullet = [] //"目前要處理的物件，暫時放在bullet變數內"
var bullets = [] //把產生的"所有"的物件，為物件的倉庫，所有物件資料都在此
// ++++++++++++++++++
// +++++++++++++++++++++++++++++++++++
var monster = [] //"目前要處理的物件，暫時放在bullet變數內"
var monsters = [] //把產生的"所有"的物件，為物件的倉庫，所有物件資料都在此
// ++++++++++++++++++
//+++++++++++++++++++++++砲台位置
var shipP
//+++++++++++++++++++++++++++++++++
var score = 0

function preload(){
  dead_sound = loadSound("sound/tong-shen-duan-huo-guo-dan-shi-mei-you-bei-jing-yin-le-yuan-shi-yin-xiao-su-cai-ying-pian.mp3")
  bullet_sound = loadSound("sound/yin-xiao-30-qiang-sheng.mp3")
  monster_sound = loadSound("sound/correct-answer-sound-effects-no-copyright.mp3")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2) //預設砲台位置
  for(var i=0;i<60;i=i+1){//i=0,1,2,3,4,8,10
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放到balls陣列內
}
 for(var i=0;i<30;i=i+1){//i=0,1,2,3,4,8,10
  monster = new Monster({}) //產生一個Monster class元件
  monsters.push(monster) //把ball的物件放到monsters陣列內
}
}
function draw() {
   background(220);
  // for(var j=0;j<balls.length;j=j+1){
  // ball=balls[j]
  // ball.draw()
  // ball.update()
  // }

  if(keyIsPressed){
    if(key=="ArrowLeft" || key=="a"){//往左
      shipP.x =shipP.x-5
      }
      if(key=="ArrowRight"|| key=="d"){//往右
        shipP.x =shipP.x+5
      }
      if(key=="ArrowUp"|| key=="w"){//往上
        shipP.y =shipP.y-5
      }
      if(key=="ArrowDown"|| key=="s"){//往下
        shipP.y =shipP.y+5
      }
  }
//++++++++++鯊魚顯示
  for(let ball of balls)
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
    if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
     balls.splice(balls.indexOf(ball),1)
     bullets.splice(bullets.indexOf(bullet),1)
     score =score-1
     dead_sound.play()
  }
}
  }
  for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters)
  {
    if(monster.dead == true && monster.timenum>4){
    monsters.splice(monsters.indexOf(monster),1) 
    }
    monster.draw()
    monster.update()
  for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
      // monsters.splice(monsters.indexOf(monster),1) //從倉庫monster
       bullets.splice(bullets.indexOf(bullet),1)
       score =score + 1 
       monster.dead = true //代表該怪物已死掉
      dead_sound.play()
      monster_sound.play()
    }
  } 
  }
    textSize(50)
    text(score,50,50) //在座標為(50,50)上，顯示Scroe分數
  push() //重新規劃原點(0,0)，在視窗中間
  let dx = mouseX - width/2
  let dy = mouseY - height/2
  let angle = atan2(dy,dx)
  translate(shipP.x,shipP.y) //把砲台的中心點放在視窗中間
  fill("#ff99c8")
  noStroke()
  rotate(angle)
  triangle(-25,-25,-25,25,50,0) //畫三個點，成一個三角形
  ellipse(0,0,50)
  pop() //恢復原本設定，原點(0,0)，在視窗左上角
}

function mousePressed(){
//   ball= new Obj({
// p:{x:mouseX,y:mouseY}
//   })
//   balls.push(ball)
bullet = new Bullet({
  r:15,
  color:"red"})
 //在滑鼠按下的地方，產生一個新的bullet class的原件
bullets.push(bullet) //把bullet放到倉庫
bullet_sound.play()


// for(let ball of balls){
//   if(ball.isBallInRanger(mouseX,mouseY)){
//     balls.splice(balls.indexOf(ball),1)
//     score =score+1
//   }
// }
}

function keyPressed(){ //按下空白鍵，發射飛彈，按下滑鼠的功能一樣
  if(key==" "){
    bullet = new Bullet({
      r:15,
      color:"red"})
     //在滑鼠按下的地方，產生一個新的bullet class的原件
    bullets.push(bullet) //把bullet放到倉庫
    bullet_sound.play()
  }
}
