'use strict';

const _gridHeight = 80;
const _gridWidth = 200;
const _refreshSeconds = 0.2;
const _fillPercentage = 25;
let _cells = getStartingCells();

function initialize() {

	createEmptyDivs();
	window.setInterval(updateGrid, _refreshSeconds * 1000);
}

function createEmptyDivs() {

	//Create row with x columns
	for (let x = 0; x < _gridWidth; x++) {
		let colDiv = window.document.createElement('div');
		window.document.querySelector('.row').appendChild(colDiv);
	}

	//duplicate y times. -1 because we started with 1 row
	for (let y = 0; y < _gridHeight - 1; y++) {
		duplicateRow();
	}
}

function getStartingCells() {
	
	let cells = new Array(_gridHeight)
		.fill(null) //Cant apply map on undefined elements, need to set to null first
		.map((item, y) => new Array(_gridWidth)
			.fill(null)
			.map((item, x) => {
				return isInAreaToRandomise(y, x) ? randomBinary() : 0;
			})
		);

	return cells;
}

function isInAreaToRandomise(y, x){

	return y < _gridHeight*_fillPercentage/100 && x < _gridWidth*_fillPercentage/100;
}

function duplicateRow() {
	let allRows = document.querySelectorAll('.row');
	let lastRow = allRows[allRows.length - 1];
	let clone = lastRow.cloneNode(true);
	document
		.querySelector('.grid')
		.appendChild(clone);
}

function updateGrid() {

	_cells = getNextGeneration(_cells);
	let allRows = document.querySelectorAll('.row');

	for (let y = 0; y < _gridHeight; y++) {

		var rowDiv = allRows[y];

		for (let x = 0; x < _gridWidth; x++) {

			let colDiv = rowDiv.childNodes[x];
			let cell = _cells[y][x];
			setIsActive(colDiv, cell);
		}
	}
}

function setIsActive(cellDiv, isActive) {
	if (isActive) {
		cellDiv.classList.remove('inactive')
		cellDiv.classList.add('active')
	} else {
		cellDiv.classList.remove('active')
		cellDiv.classList.add('inactive')
	}
}

function randomBinary() {
	let max = 1
	let min = 0
	return Math.floor(
		Math.random() * (max - min + 1)
	)
}

initialize();