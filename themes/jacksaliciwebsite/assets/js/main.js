var svg = document.getElementById("svg");
var dotMatrix = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
var dots = [];
var dotStepX = 30;
var dotStepY = 30;
var screenW = window.innerWidth;
var screenH = window.innerHeight;
var dotColumns = Math.round(screenW / dotStepX);
var dotRows = Math.round(screenH / dotStepY);
var dotRandomMax = 0;

var mouseMoving = false;
var mouse = {};

var returningSpeed = 1;
mouse.distances = [];
mouse.power = 10;

function init() {

  screenW = window.innerWidth;
  screenH = window.innerHeight;
  dotColumns = Math.round(screenW / dotStepX);
  dotRows = Math.round(screenH / dotStepY);

  for (i = 0, j = 0, k = 0; i < dotColumns * dotRows; i++) {
    //j iterates rows
    //k iterates cols
    //i = j*dotColumns + k
    j = Math.floor(i / dotColumns);
    k = i % dotColumns;

    dots[i] = {};
    dots[i].distances = [];
    dots[i].el = dotMatrix.cloneNode(false);
    dots[i].X = k * dotStepX - dotRandomMax /2 + Math.random()*dotRandomMax  + dotStepX / 2;
    dots[i].Y = j * dotStepY - dotRandomMax /2 + Math.random()*dotRandomMax + dotStepX / 2;

    dots[i].r = 1;
    dots[i].X0 = dots[i].X;
    dots[i].Y0 = dots[i].Y;

    dots[i].el.setAttribute("cx", dots[i].X);
    dots[i].el.setAttribute("cy", dots[i].Y);
    dots[i].el.setAttribute("r", dots[i].r);
    svg.appendChild(dots[i].el);
  }
}

function move() {
    for (i = 0, j = 0, k = 0; i < dotColumns * dotRows; i++) {

    }

}



function destroy() {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  dots.length = 0;
}

init();

window.addEventListener("resize", function () {
  destroy();
  init();
});

