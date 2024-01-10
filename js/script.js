let inputDir = { x: 0, y: 0 };
const foodsSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3');
const gameoverSound = new Audio('music/gameover.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 4;
let score =0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

food= {x:6 , y:7};

//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if Bump into itself
    for (let i= 1; i< snakeArr.length;+i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
//if You bump into the wall
if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y<=0){
    return true;
}
}
function gameEngine() {
    //updating the snake array & food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir= {x :0 , y:0};
        alert('GameOver press any key to play again!');
        snakeArr = [{  x: 13, y: 15 }];
        musicSound.play();
        score = 0;  
    }

    // if you have eaten the food increment the  score & regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        foodsSound.play();
        score += 1;
        scoreBox.innerHTML ="score: "+ score;
        snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b =16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())}
    }

     //Moving the Snake
     for (let i = snakeArr.length-2; i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}; 
             
   }

       snakeArr[0].x += inputDir.x;
       snakeArr[0].y += inputDir.y;  
   

    //display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');    
        }
        
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement)
    
}

//Main Logic Starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x:0,Y:1} //start the game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
        console.log("ArrowUp");  
        inputDir.x = 0;
        inputDir.y = -1;       
         break;

         case "ArrowDown":
        console.log("ArrowDown"); 
        inputDir.x = 0;
        inputDir.y = 1;        
            break;

         case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x = 1;
        inputDir.y = 0;         
            break;   
            
        case "ArrowLeft":
        console.log("ArrowLeft");    
        inputDir.x = -1;
        inputDir.y = 0;     
             break;                     
        default:
            break;
    }
})