'use strict';
var rowNum = 20;
var columnNum = 50;
var pixelColor = "black";

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
  createRow(1);
  // setPixelHeight();
}

function removeRow() {
  var rows = document.getElementsByClassName("pixelRow");
  var lastRow = rows[rows.length - 1];
  lastRow.parentNode.removeChild(lastRow);
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
  columnNum--;
  var rows = document.getElementsByClassName("pixelRow");
  for (var i = 0; i < rows.length; i++) {
    rows[i].removeChild(rows[i].childNodes[rows[i].childNodes.length-1]);
  }
  setPixelHeight();
}

function colorPixel(event) {
  event.target.style.backgroundColor = pixelColor;
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
      pixels[i].style.height = pixelHeight+"px";
    }
  }
}

var grid = document.getElementById("grid");
grid.addEventListener("click", colorPixel);

window.addEventListener("resize", setPixelHeight);

createRow(rowNum);
