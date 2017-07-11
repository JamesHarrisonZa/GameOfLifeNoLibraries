const _refreshSeconds = 0.2;
const _fillPercentage = 40; //Disable animations if you want to fill more
const _gridHeight = getGridHeight();
const _gridWidth = getGridWidth();
let _cells = getStartingCells();

let initialize = () => {

	createEmptyDivs();
	window.setInterval(updateGrid, _refreshSeconds * 1000);
}

initialize();