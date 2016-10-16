'use strict';

// Number of rows and columns to generate initial grid
var rowNum = 35;
var columnNum = 35;

// Global pixel color
var pixelColor = "";

// ----- Generating the initial grid and adding rows and columns later

function fillRow(row, howMany) {
  // Creates a specified number of columns and appends to a row
  var pixel;
  for (var i = 0; i < howMany; i++) {
    pixel = document.createElement("div");
    pixel.className = "pixelBlock";
    pixel.addEventListener("mouseenter", highlightPixel);
    pixel.addEventListener("mouseleave", unhighlightPixel);
    row.appendChild(pixel);
  }
}

function createRow(howMany) {
  // Creates a specified number of rows and appends to the grid
  var row;
  for (var i = 0; i < howMany; i++) {
    row = document.createElement("div");
    row.className = "pixelRow";
    grid.appendChild(row);
    fillRow(row, columnNum);
  }
  setPixelHeight();
}

// ----- Adding rows and columns -----

function addRow() {
  // Adds one row to the bottom
  rowNum++;
  createRow(1);
}

function removeRow() {
  // Deletes one row from the bottom
  if (rowNum > 1) {
    rowNum--;
    var rows = document.getElementsByClassName("pixelRow");
    var lastRow = rows[rows.length - 1];
    lastRow.parentNode.removeChild(lastRow);
  }
}

function addCol() {
  // Adds one column on the right
  columnNum++;
  var rows = document.getElementsByClassName("pixelRow");
  for (var i = 0; i < rows.length; i++) {
    fillRow(rows[i],1);
  }
  setPixelHeight();
}

function removeCol() {
  // Deletes one column from the right
  if (columnNum > 1) {
    columnNum--;
    var rows = document.getElementsByClassName("pixelRow");
    for (var i = 0; i < rows.length; i++) {
      rows[i].removeChild(rows[i].childNodes[rows[i].childNodes.length-1]);
    }
    setPixelHeight();
  }
}

// ----- Highlighting Pixels -----

function highlightPixel(event) {
  event.target.style.border = "1px dashed gray";
}

function unhighlightPixel(event) {
  if (event.target.style.backgroundColor === "") {
    event.target.style.border = "1px solid gray";
  } else {
    event.target.style.border = "1px solid "+event.target.style.backgroundColor;
  }
}

// ----- Circle colors -----

function randomColor() {
  // Returns a random hexadecimal color
  var possible = "0123456789ABCDEF";
  var finalColor = "#";
  for (var i = 0; i < 6; i++) {
    finalColor += possible[Math.floor(Math.random() * 16)];
  }
  return finalColor;
}

function setCircleColor(circle, color) {
  // Sets the backgroundColor of a circle with the specified color
  circle.style.backgroundColor = color;
}

function randomizeCircleColors() {
  // Adds a random backgroundColor to the circles in the right column
  var circles = document.getElementsByClassName("random");
  for (var i = 0; i < circles.length; i++) {
    setCircleColor(circles[i], randomColor());
  }
}

// ----- Coloring and resizing pixels -----

function colorPixel(event) {
  // Colors a pixel that has been clicked on
  if (event.target.id !== "grid") {
    event.target.style.backgroundColor = pixelColor;
    event.target.style.borderColor = pixelColor;
  }
}

function eraser() {
  // Changes the global color variable to blank
  pixelColor = "";
}

function clearCanvas() {
  var pixels = document.getElementsByClassName("pixelBlock");
  for (var i = 0; i < pixels.length; i++) {
    pixels[i].style.backgroundColor = "";
    pixels[i].style.borderColor = "";
  }
}

function addCustomColor() {
  var custom = document.getElementById("customColor").value;
  pixelColor = custom;
  document.getElementById("current").style.backgroundColor = pixelColor;
}

function setPixelHeight() {
  // Sets the height of each pixel to equal the width
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


// Create grid and generate random colors
var grid = document.getElementById("grid");
createRow(rowNum);
randomizeCircleColors();

// Colors a pixel when it is clicked
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

// ----- Resize event for keeping the pixels square -----

window.addEventListener("resize", setPixelHeight);

window.onload = function() {
  setPixelHeight();
}
