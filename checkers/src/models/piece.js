export class Piece {
    element;                // to which DOM element the piece is linked
    position;               // the position in string array ["0vw","0vw"] for example
    player;                 // which player's piece it is
    king = false;           // werther the piece is king
    pieceColor;             // the class in the DOM (black/white)

    constructor(element = null, position = null) {
        this.element = element;
        this.position = position;
    }

    // Make the pieces for the DOM to pieces in the array pieces[]
    // They will be in starting position
    static createPieces(pId) {
        // Extract the number out of the id
        let idNumber = pId.replace('piece', '');
        const rowNumber = Math.ceil((2 * idNumber) / 10);
        // Calculate the x and y values for the piece
        let y = -2 + (rowNumber * 4);
        let x;
        let multiplier; // This multiplier is used to determine the nth place of the piece in the row
        if (idNumber % 5 === 0) {
            multiplier = 5;
        } else {
            multiplier = idNumber % 5;
        }
        // The pieces skip places every row because the checker pattern
        if (rowNumber % 2 === 1) {
            x = 6 + (8 * (multiplier - 1)); // Odd rows
        } else {
            x = 2 + (8 * (multiplier - 1)); // Even rows
        }

        // Create the new piece with the given pId and the calculated x and y
        let newPiece = new Piece(pId, [x + 'vw', y + 'vw']);

        if (idNumber <= 20) { // Player 1, black, has piece 1 to 20
            newPiece.player = 1;
            newPiece.pieceColor = "bPiece"
        } else if (idNumber > 20) { // Player 2, white, has piece 21 to 40
            newPiece.player = 2;
            newPiece.pieceColor = "wPiece"
            // Between the black and white pieces there are two empty rows therefore add 8 to y
            newPiece.position = [x + 'vw', (y + 8) + 'vw']
        }

        return newPiece;
    }

    // Assign position method
    assignPosition(x, y) {
        this.position[0] = x + "vw";
        this.position[1] = y + "vw";
    }

    // Extract numbers from string and casts them to string
    extractNum(string) {
        return parseInt(string.replace(/\D/g, ''))
    }

    // Calculate werther the tile is in range of the piece
    // Uses basic math a^2+b^2=c^2
    isTileInRange(tileX, tileY, pieceX, pieceY) {
        // Tile is a 4x4 vw square
        const allowedRange = Math.sqrt(Math.pow(4, 2) * 2, 2);
        // Put the coordinates of piece at the corner of tile by -2
        pieceX -= 2;
        pieceY -= 2;

        const deltaX = pieceX - tileX;
        const deltaY = pieceY - tileY;
        const currentRange = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2), 2)

        // If the chosen tile 2 times range check werther it can jump a piece
        if (currentRange === 2*allowedRange) {
            return "maybeJump"
        }
        // If the chosen tile more than 2 times range return false
        else if (currentRange > 2*allowedRange) {
            console.log("Not in range")
            return false
        }
        // If the chosen tile is in range return true
        else if (currentRange <= allowedRange) {
            return true
        }
    }

    // Checks werther there is a piece with the same coordinates
    // If that's te case; return false, otherwise return; true
    tileFree(selectedTile, pieces) {
        // Compensate the fact that the x and y are at the middle of tile (that's 4vw wide)
        let positionTile = [
            this.extractNum(selectedTile.position[0]) + 2,
            this.extractNum(selectedTile.position[1]) + 2
        ];

        // If there is a piece the same position as tile returns false
        let noOccurrence = pieces.every(function positionOccursInPieces(piece) {
            let positionPiece = [
                +piece.position[0].replace(/\D/g, ''),
                +piece.position[1].replace(/\D/g, '')
            ]
            return JSON.stringify(positionPiece) !== JSON.stringify(positionTile);
        })

        // If there is no piece in pieces with the same position as the new position: return true
        return noOccurrence === true;
    }

    // ------------------   MOVE    ------------------
    // Move the piece
    movePiece(toTile, pieces) {
        let isMoved = false;
        // when false the tile cannot be chosen because another piece is there
        // when true the tile can be chosen
        if (!this.tileFree(toTile, pieces)) {
            return isMoved
        }

        // Extract de numbers from the position
        const toTileX = this.extractNum(toTile.position[0]);
        const toTileY = this.extractNum(toTile.position[1]);
        const pieceX = this.extractNum(this.position[0]);
        const pieceY = this.extractNum(this.position[1]);

        // Check werther toTile is in range of piece
        const inRange = this.isTileInRange(toTileX, toTileY, pieceX, pieceY);

        if (inRange === true) {
            // The piece can't move straight up or down
            // -2 because the coordinates of piece are at the center of tile
            if (toTileX !== pieceX - 2 && toTileY !== pieceY - 2) {
                if (this.king === true) { // If a piece is king it may go up and down
                    this.assignPosition(toTileX + 2, toTileY + 2);
                } else if (this.pieceColor === "bPiece" && toTileY > pieceY) { // black may only go down
                    this.assignPosition(toTileX + 2, toTileY + 2);
                } else if (this.pieceColor === "wPiece" && toTileY < pieceY) { // white may only go up
                    this.assignPosition(toTileX + 2, toTileY + 2);
                }
                isMoved = true;
            }
        }
        // If the tile is in jump range
        else if (inRange === "maybeJump") {
            // Calculate delta distance
            const deltaX = ( toTileX + 2 - pieceX ) / 2;
            const deltaY = ( toTileY + 2 - pieceY ) / 2;
            // Add delta to the current position to get the position of the skipped tile
            let toBeatX = pieceX + deltaX;
            let toBeatY = pieceY + deltaY;
            toBeatX = toBeatX + "vw";
            toBeatY = toBeatY + "vw";
            // Find the piece with the position
            const toBeatPiece = pieces.find(x => x.position[0] === toBeatX && x.position[1] === toBeatY);
            // Check werther it's the opponents
            if (toBeatPiece.pieceColor !== this.pieceColor) {
                // Delete piece
                const indexToBeatGame = pieces.indexOf(toBeatPiece);
                pieces.splice(indexToBeatGame, 1) // Only splice the piece at the given index
                // Move the played piece
                this.assignPosition(toTileX + 2, toTileY + 2);
                isMoved = true;
            }
        }

        // ------------------   KING    ------------------
        // Makes the piece king when it reaches the other side
        if(toTileY === 0 && this.pieceColor.includes("wPiece") && this.king !== true) {
            this.king = true;
        } else if(toTileY === 36 && this.pieceColor.includes("bPiece") && this.king !== true) {
            this.king = true;
        }

        return isMoved

    }
}
