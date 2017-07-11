'use strict';

let createEmptyDivs = () => {

	//Create row with x columns
	for (let x = 0; x < _gridWidth; x++) {
		let colDiv = window.document.createElement('div');
		colDiv.classList.add('inactive');
		window.document.querySelector('.row').appendChild(colDiv);
	}

	//duplicate y times. -1 because we started with 1 row
	for (let y = 0; y < _gridHeight - 1; y++) {
		duplicateRow();
	}
}

let getGridHeight = () => {

	const viewPortHeigth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return getGridCellUnits(viewPortHeigth);
}

let getGridWidth = () => {

	const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	return getGridCellUnits(viewPortWidth);
}

let getGridCellUnits = (viewPortSize) => {

	const cellHeight = 10;
	const extraMargin = 2;
	return Math.floor(viewPortSize / cellHeight) - extraMargin;
}

let getStartingCells = () => {

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

let isInAreaToRandomise = (y, x) => {

	return y < _gridHeight * _fillPercentage / 100 && x < _gridWidth * _fillPercentage / 100;
}

let duplicateRow = () => {
	let allRows = document.querySelectorAll('.row');
	let lastRow = allRows[allRows.length - 1];
	let clone = lastRow.cloneNode(true);
	document
		.querySelector('.grid')
		.appendChild(clone);
}

let updateGrid = () => {

	_cells = getNextGeneration(_cells);
	const allRows = document.querySelectorAll('.row');

	for (let y = 0; y < _gridHeight; y++) {

		const rowDiv = allRows[y];

		for (let x = 0; x < _gridWidth; x++) {

			const colDiv = rowDiv.childNodes[x];
			const cell = _cells[y][x];

			if (cellNeedsUpdating(colDiv, cell)) {
				setIsActive(colDiv, cell);
			}
		}
	}
}

let cellNeedsUpdating = (colDiv, cell) => {

	return (colDiv.classList[0] === 'inactive' && cell === 1) || (colDiv.classList[0] === 'active' && cell === 0);
}

let setIsActive = (cellDiv, isActive) => {
	if (!!isActive) {
		cellDiv.classList.remove('inactive', 'animated', 'fadeOut');
		cellDiv.classList.add('active', 'animated', 'fadeIn');
	} else {
		cellDiv.classList.remove('active', 'animated', 'fadeIn');
		cellDiv.classList.add('inactive', 'animated', 'fadeOut');
	}
}

let randomBinary = () => {
	let max = 1;
	let min = 0;
	return Math.floor(Math.random() * (max - min + 1));
}