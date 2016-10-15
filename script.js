'use strict';
var rowNum = 30;
var columnNum = 40;
var pixelColor = "";

function fillRow(row, howMany) {
  var pixel;
  for (var i = 0; i < howMany; i++) {
    pixel = document.createElement("div");
    pixel.className = "pixelBlock";
    row.appendChild(pixel);
  }
}

function createRow(howMany) {
  var row;
  for (var i = 0; i < howMany; i++) {
    row = document.createElement("div");
    row.className = "pixelRow";
    grid.appendChild(row);
    fillRow(row, columnNum);
  }
  setPixelHeight();
}

function addRow() {
  rowNum++;
  createRow(1);
}

function removeRow() {
  if (rowNum > 1) {
    rowNum--;
    var rows = document.getElementsByClassName("pixelRow");
    var lastRow = rows[rows.length - 1];
    lastRow.parentNode.removeChild(lastRow);
  }
}

function addCol() {
  columnNum++;
  var rows = document.getElementsByClassName("pixelRow");
  for (var i = 0; i < rows.length; i++) {
    fillRow(rows[i],1);
  }
  setPixelHeight();
}

function removeCol() {
  if (columnNum > 1) {
    columnNum--;
    var rows = document.getElementsByClassName("pixelRow");
    for (var i = 0; i < rows.length; i++) {
      rows[i].removeChild(rows[i].childNodes[rows[i].childNodes.length-1]);
    }
    setPixelHeight();
  }
}

function colorPixel(event) {
  event.target.style.backgroundColor = pixelColor;
  event.target.style.borderColor = pixelColor;
}

function randomColor() {
  var possible = "0123456789ABCDEF";
  var finalColor = "#";
  for (var i = 0; i < 6; i++) {
    finalColor += possible[Math.floor(Math.random() * 16)];
  }
  return finalColor;
}

function setCircleColor(circle, color) {
  circle.style.backgroundColor = color;
}

function randomizeCircleColors() {
  var circles = document.getElementsByClassName("random");
  for (var i = 0; i < circles.length; i++) {
    setCircleColor(circles[i], randomColor());
  }
}

function setPixelHeight() {
  // var pixelHeight = document.getElementsByClassName("pixelBlock")[0].offsetWidth;
  // var styleSheet = document.styleSheets[0];
  // try {
  //   styleSheet.removeRule(7);
  // } catch(e) {
  // }
  // styleSheet.insertRule('.pixelBlock {height: '+pixelHeight+'px;}', 7);
  var pixelHeight = document.getElementsByClassName("pixelBlock")[0].offsetWidth;
  var rows = document.getElementsByClassName("pixelRow");
  var pixels;
  for (var i = 0; i < rows.length; i++) {
    pixels = rows[i].childNodes;
    for (var j = 0; j < pixels.length; j++) {
      pixels[j].style.height = pixelHeight+"px";
    }
  }
}

function eraser() {
  pixelColor = "";
}

var grid = document.getElementById("grid");
grid.addEventListener("click", colorPixel);

// ----- Click and drag paintbrush -----
function mouseOver(event) {
  colorPixel(event);
}

grid.addEventListener("mousedown", function(event) {
  colorPixel(event);
  grid.addEventListener("mouseover", mouseOver);
});

grid.addEventListener("mouseup", function() {
  grid.removeEventListener("mouseover", mouseOver);
});

// ----- Changing Colors -----
function changeColor(event) {
  pixelColor = event.target.style.backgroundColor;
  document.getElementById("current").style.backgroundColor = pixelColor;
}

var colors = document.getElementsByClassName("color");
for (var i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", changeColor);
}

window.addEventListener("resize", setPixelHeight);

createRow(rowNum);
randomizeCircleColors();
