'use strict';

const _gridHeight = 100;
const _gridWidth = 1000;
let _cells = getStartingCells(_gridHeight, _gridWidth);

function initialize() {

	const refreshSeconds = 1;
	createEmptyDivs(_gridHeight, _gridWidth);
	window.setInterval(updateGrid, refreshSeconds * 1000);
}

function createEmptyDivs(gridHeight, gridWidth) {

	//Create row with x columns
	for (let x = 0; x < gridWidth; x++) {
		let colDiv = window.document.createElement('div');
		window.document.querySelector('.row').appendChild(colDiv);
	}

	//duplicate y times. -1 because we started with 1 row
	for (let y = 0; y < gridHeight - 1; y++) {
		duplicateRow();
	}
}

function getStartingCells(gridHeight, gridWidth) {

	let cells = new Array(gridHeight)
		.fill(new Array(gridWidth)
			.fill(null)
			.map(_ => randomBinary())
		);

	return cells;
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

			setIsActive(colDiv, cell); //randomBinary() Change to pass in 1 or 0
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