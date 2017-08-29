'use strict';

let grid = function(startingCells, gameOfLife) {

	this._gridHeight = startingCells.cellsHeight;
	this._gridWidth = startingCells.cellsWidth;
	this._cells = startingCells.cells;
	this._gameOfLife = gameOfLife;

	// public methods

	let createEmptyDivs = () => {

		//Create row with x columns
		for (let x = 0; x < this._gridWidth; x++) {
			let colDiv = window.document.createElement('div');
			colDiv.classList.add('inactive');
			window.document.querySelector('.row').appendChild(colDiv);
		}

		//duplicate y times. -1 because we started with 1 row
		for (let y = 0; y < this._gridHeight - 1; y++) {
			duplicateRow();
		}
	}

	let updateGrid = () => {

		this._cells = this._gameOfLife.getNextGeneration(this._cells);
		const allRows = document.querySelectorAll('.row');

		for (let y = 0; y < this._gridHeight; y++) {

			const rowDiv = allRows[y];

			for (let x = 0; x < this._gridWidth; x++) {

				const colDiv = rowDiv.childNodes[x];
				const cell = this._cells[y][x];

				if (cellNeedsUpdating(colDiv, cell)) {
					setIsActive(colDiv, cell);
				}
			}
		}
	}

	// private methods

	let duplicateRow = () => {
		let allRows = document.querySelectorAll('.row');
		let lastRow = allRows[allRows.length - 1];
		let clone = lastRow.cloneNode(true);
		document
			.querySelector('.grid')
			.appendChild(clone);
	}

	let cellNeedsUpdating = (colDiv, cell) => {

		return (colDiv.classList[0] === 'inactive' && cell === 1) || (colDiv.classList[0] === 'active' && cell === 0);
	}

	let setIsActive = (cellDiv, isActive) => {
		if (!!isActive) {
			cellDiv.classList.remove('inactive'); //, 'animated', 'fadeOut'
			cellDiv.classList.add('active'); //, 'animated', 'fadeIn'
		} else {
			cellDiv.classList.remove('active');
			cellDiv.classList.add('inactive');
		}
	}

	return {
		createEmptyDivs: createEmptyDivs,
		updateGrid: updateGrid
	};
}