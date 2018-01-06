'use strict';

const gameOfLife = function(){

	const getNextGeneration = (cells) => {

		return cells.map((row, r) => {
			return row.map((isAlive, c) => {

				const neighbours =
					getCell(cells, r - 1, c - 1) + getCell(cells, r - 1, c) + getCell(cells, r - 1, c + 1) +
					getCell(cells, r, c - 1) 								+ getCell(cells, r, c + 1) +
					getCell(cells, r + 1, c - 1) + getCell(cells, r + 1, c) + getCell(cells, r + 1, c + 1);

				return (neighbours === 3 || (neighbours === 2 && isAlive)) ? 1 : 0;
			});
		});
	}

	const getCell = (cells, row, col) => (cells[row] && cells[row][col]) ? 1 : 0;

	return {
		getNextGeneration: getNextGeneration
	};
}