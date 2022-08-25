
var svg = document.getElementById("svg");
var dotMatrix = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
var dots = [];
var dotNumber = 300;

var screenW;
var screenH;
var dotColumns;
var dotRows;
var dotRandomMax = 0;

var mouseMoving = false;
var mouse = {};

var returningSpeed = 1;
mouse.distances = [];
mouse.power = 10;

//////////////////////////////////////// init

function init() {
  console.log("--- init");
  screenW = window.innerWidth;
  screenH = window.innerHeight;

  dotRows = Math.sqrt(dotNumber * (screenH / screenW));
  dotColumns = dotNumber / dotRows;
  var dotPosStepX = Math.round(screenW / dotColumns);
  var dotPosStepY = Math.round(screenH / dotRows);
  dotRows = Math.round(dotRows);
  dotColumns = Math.round(dotColumns);
  console.log("--- calc done");

  for (i = 0, j = 0, k = 0; i < dotNumber; i++, k++) {
    if (i % dotColumns === 0) {
      j++;
      k = 0;
    }
    dots[i] = {};
    dots[i].distances = [];
    dots[i].el = dotMatrix.cloneNode(false);
    dots[i].X = k * dotPosStepX + dotPosStepX / 2;
    dots[i].X += Math.floor(
      Math.random() * dotRandomMax + 1 - dotRandomMax / 2
    );
    dots[i].Y = j * dotPosStepY - dotPosStepY / 2;
    dots[i].Y += Math.floor(
      Math.random() * dotRandomMax + 1 - dotRandomMax / 2
    );
    dots[i].r = 1;
    dots[i].X0 = dots[i].X;
    dots[i].Y0 = dots[i].Y;

    dots[i].el.setAttribute("cx", dots[i].X);
    dots[i].el.setAttribute("cy", dots[i].Y);
    dots[i].el.setAttribute("r", dots[i].r);
    svg.appendChild(dots[i].el);
  }
  console.log("--- dots positioned");
}

function destroy() {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  dots.length = 0;
  console.log("--- destroying");
}

init();

//////////////////////////////////////// update dots and lines position

function dotUpdate() {
  for (i = 0; i < dotNumber; i++) {
    dots[i].el.setAttribute("cx", dots[i].X);
    dots[i].el.setAttribute("cy", dots[i].Y);
    dots[i].el.setAttribute("r", dots[i].r);
  }
}

//////////////////////////////////////// helpers

function getDistance(obj1, obj2) {
  return Math.floor(
    Math.sqrt(Math.pow(obj1.X - obj2.X, 2) + Math.pow(obj1.Y - obj2.Y, 2))
  );
}

function Comparator(a, b) {
  if (a[1] < b[1]) return -1;
  if (a[1] > b[1]) return 1;
  return 0;
}

//////////////////////////////////////// movement function

function moveDots() {
  for (i = 0; i < dotNumber; i++) {
    for (j = 0; j < dotNumber; j++) {
      dots[i].distances[j] = [j, getDistance(dots[i], dots[j])];
    }
    dots[i].distances = dots[i].distances.sort(Comparator);
  }
  dotUpdate();
}

//////////////////////////////////////// mouse interaction function

function mouseInteraction() {
  if (mouseMoving) {
    mouse.X = mouseX;
    mouse.Y = mouseY;

    for (i = 0; i < dotNumber; i++) {
      dots[i].r = 1;
      mouse.distances[i] = [i, getDistance(mouse, dots[i])];
    }
    mouse.distances = mouse.distances.sort(Comparator);

    for (j = 0; j < mouse.power; j++) {
      var maxDist = mouse.distances[mouse.power - 1][1];
      var thisDist = mouse.distances[j][1];
      dots[mouse.distances[j][0]].r = 2;

      if (mouseX >= dots[mouse.distances[j][0]].X) {
        dots[mouse.distances[j][0]].X -= (maxDist - thisDist) / 15;
      } else {
        dots[mouse.distances[j][0]].X += (maxDist - thisDist) / 15;
      }
      if (mouseY >= dots[mouse.distances[j][0]].Y) {
        dots[mouse.distances[j][0]].Y -= (maxDist - thisDist) / 15;
      } else {
        dots[mouse.distances[j][0]].Y += (maxDist - thisDist) / 15;
      }
    }

    mouseMoving = false;
  }
}

//////////////////////////////////////// listeners

var initInterval = setInterval(function () {
  moveDots();
  mouseInteraction();
}, 20);

svg.addEventListener("mousemove", function (e) {
  mouseMoving = true;
  mouseX = e.pageX;
  mouseY = e.pageY;
});

window.addEventListener("resize", function () {
  destroy();
  init();
});
