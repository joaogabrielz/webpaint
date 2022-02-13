//Initial DATA

let currentColor = 'black';
let canDraw = false;

let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let context = screen.getContext('2d');


//EVENTS

document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);
/* 
Logic/Steps:
- When mouse click down, active drawning mode ;
- when mouse move, if mouse drawing has active , draw ;
- when mouse click up , desactive drawning mode ;
*/

//FUNCTIONS

function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
  //  console.log(color);
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}
function mouseDownEvent(e){
//test   console.log('clicked')
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e){
//test    console.log('moved')
    if(canDraw){
        // let pointX = e.pageX - screen.offsetLeft;
        // let pointY = e.pageY - screen.offsetTop;
        // console.log(pointX, pointY);
       draw(e.pageX, e.pageY);
    }
}
function mouseUpEvent(){
 //test   console.log('droped')
    canDraw = false;
}

function draw(x, y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //Draw
    context.beginPath();
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.moveTo(mouseX, mouseY);
    context.lineTo(pointX, pointY);
    context.closePath();
    context.strokeStyle = currentColor;
    context.stroke();

    mouseX = pointX;
    mouseY = pointY;
}
function clearScreen(){
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}