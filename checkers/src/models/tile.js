let nextClass = "white";

export class Tile {
    element; // = to which DOM element the tile is linked
    position; // = the position in the gameBoard array in format row, column
    class; // = the class in the DOM (black/white)

    constructor(element = null, position = null, tileClass = "") {
        this.element = element;
        this.position = position;
        this.class = tileClass;
    }

    // Make the tiles for the DOM to tiles in the array tiles[]
    // They will be in starting position
    static createTiles(counter, tiles) {
        // Calculate the x and y values for the piece
        const tilesAmount = tiles.length;
        const rowNumber = Math.ceil((tilesAmount + 1) / 10);
        // Calculate the x and y values for the piece
        const y = (rowNumber - 1) * 4; // -1 because the first row is on 0*height
        let multiplier; // This multiplier is used to determine the nth place of the piece in the row
        if (counter % 10 === 0) { // The 10th place on each row would return 0 while the multiplier is 9
            multiplier = 9;
        } else {
            multiplier = (counter % 10) - 1;
        }
        const x = 4 * multiplier;

        // Determine class
        let tileClass;
        if (nextClass === "white") {
            if (counter % 10 !== 0) {
                nextClass = "black";
            }
            tileClass = "white";
        } else {
            if (counter % 10 !== 0) {
                nextClass = "white";
            }
            tileClass = "black";
        }

        const newTile = new Tile('sq' + counter, [x + 'vw', y + 'vw'], tileClass);

        return newTile;
    }
}