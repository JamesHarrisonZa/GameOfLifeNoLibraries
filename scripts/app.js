'use strict';

const _refreshSeconds = 0.2;

let initialize = () => {

	let myGrid = new grid(new startingCells(), new gameOfLife());
	myGrid.createEmptyDivs();
	window.setInterval(myGrid.updateGrid, _refreshSeconds * 1000);
}

initialize();