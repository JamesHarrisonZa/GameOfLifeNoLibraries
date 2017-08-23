'use strict';

let gameOfLife = function(){

	let getNextGeneration = (cells) => {

		return cells.map((row, r) => {
			return row.map((isAlive, c) => {

				const neighbours =
					getCell(cells, r - 1, c - 1) + getCell(cells, r - 1, c) + getCell(cells, r - 1, c + 1) +
					getCell(cells, r, c - 1) 								+ getCell(cells, r, c + 1) +
					getCell(cells, r + 1, c - 1) + getCell(cells, r + 1, c) + getCell(cells, r + 1, c + 1);

				return (neighbours === 3 || (neighbours === 2 && isAlive)) | 0;
			});
		});
	}

	let getCell = (cells, r, c) => { return (cells[r] && cells[r][c]) | 0; }

	return {
		getNextGeneration: getNextGeneration
	};
}