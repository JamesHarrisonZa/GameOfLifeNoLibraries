let startingCells = function () {

	const _fillPercentage = 40; //Disable animations if you want to fill more

	//private

	let getCellUnits = (viewPortSize) => {

		const cellDimension = 10;
		const extraMargin = 2;
		return Math.floor(viewPortSize / cellDimension) - extraMargin;
	}

	let getCellsHeight = () => {

		const viewPortHeigth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return getCellUnits(viewPortHeigth);
	}

	let getCellsWidth = () => {

		const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		return getCellUnits(viewPortWidth);
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

	//public
	this._gridHeight = getCellsHeight(); 
	this._gridWidth = getCellsWidth();
	this._cells = getStartingCells(this._gridHeight, this._gridWidth);

	return {
		cellsHeight: this._gridHeight, 
		cellsWidth: this._gridWidth, 
		cells: this._cells
	}
}