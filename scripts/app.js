const _refreshSeconds = 0.2;
const _fillPercentage = 40; //Disable animations if you want to fill more

let getGridCellUnits = (viewPortSize) => {

	const cellDimension = 10;
	const extraMargin = 2;
	return Math.floor(viewPortSize / cellDimension) - extraMargin;
}

let getGridHeight = () => {

	const viewPortHeigth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return getGridCellUnits(viewPortHeigth);
}

let getGridWidth = () => {

	const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	return getGridCellUnits(viewPortWidth);
}

let getStartingCells = (gridHeight, gridWidth) => {

	let cells = new Array(gridHeight)
		.fill(null) //Cant apply map on undefined elements, need to set to null first
		.map((item, y) => new Array(gridWidth)
			.fill(null)
			.map((item, x) => {
				return isInAreaToRandomise(gridHeight, gridWidth, y, x) ? randomBinary() : 0;
			})
		);

	return cells;
}

let isInAreaToRandomise = (gridHeight, gridWidth, y, x) => {

	return y < gridHeight * _fillPercentage / 100 && x < gridWidth * _fillPercentage / 100;
}

let randomBinary = () => {
	let max = 1;
	let min = 0;
	return Math.floor(Math.random() * (max - min + 1));
}

let initialize = () => {

	const gridHeight = getGridHeight();
	const gridWidth = getGridWidth();
	let cells = getStartingCells(gridHeight, gridWidth)
	let myGrid = new grid(gridHeight, gridWidth, cells);
	myGrid.createEmptyDivs();
	window.setInterval(myGrid.updateGrid, _refreshSeconds * 1000);
}

initialize();