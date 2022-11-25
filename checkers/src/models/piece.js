export class Piece {
    // Quick ideas to make this working:
    // - Maybe put the board in the methods as parameter

    element; // = to which DOM element the piece is linked
    position; // = the position in the gameBoard array in format row, column
    // when jump exist, regular move is not allowed
    // since there is no jump at round 1, all pieces are allowed to move initially
    allowedToMove = true;
    player; // = which player's piece it is
    king = false; // = werther the piece is king

    constructor(element = null, position = null) {
        this.element = element;
        this.position = position;
    }

    // Make the pieces for the DOM to pieces in the array pieces[]
    // They will be in starting position
    static createPieces(pId) {
        // Extract the number out of the id
        let idNumber = pId.replace('piece','');
        const rowNumber = Math.ceil((2*idNumber)/10);
        // Calculate the x and y values for the piece
        let x;
        const y = -2 + (rowNumber*4);
        let multiplier; // This multiplier is used to determine the nth place of the piece in the row
        if(idNumber%5=== 0){
            multiplier = 5;
        } else {
            multiplier = idNumber%5;
        }

        if ( rowNumber%2===1) {
            x =  6 + (8*(multiplier-1)); // Odd rows
        } else {
            x =  2 + (8*(multiplier-1)); // Even rows
        }
        console.log(rowNumber)

        // :cx="6 + (8*(i-1)) + 'vw'" cy="2vw"
        // :cx="2 + (8*(i-1)) + 'vw'" cy="6vw"
        // :cx="6 + (8*(i-1)) + 'vw'" cy="10vw"
        // :cx="2 + (8*(i-1)) + 'vw'" cy="14vw"

        let newPiece = new Piece(pId,[x,y]);

        if ( idNumber <= 20 ) { // Player 1, black, has piece 1 to 20
            newPiece.player = 1;
        } else if (idNumber > 20) { // Player 2, black, has piece 21 to 40
            newPiece.player = 2;
        }

        return newPiece;
    }

    // Make the piece king
    static makeKing() {
        this.element.css("backgroundImage", "url('img/king" + this.player + ".png')");
        this.king = true;
    }

    // Move the piece
    static movePiece(toTile) {
        // Remove the selected class
        this.element.removeClass('selected');

        // Check werther the piece can be moved to tile
        if (!Board.isValidPlacetoMove(toTile.position[0], toTile.position[1])) return false;

        // Make sure piece doesn't go backwards if it's not a king
        if (this.player === 1 && this.king === false) {
            if (toTile.position[0] < this.position[0]) return false;
        } else if (this.player === 2 && this.king === false) {
            if (toTile.position[0] > this.position[0]) return false;
        }

        // remove the mark from Board.board and put it in the new spot
        Board.board[this.position[0]][this.position[1]] = 0;
        Board.board[toTile.position[0]][toTile.position[1]] = this.player;
        this.position = toTile.position[0], toTile.position[1];

        // Change the css using board's dictionary
        this.element.css('top', Board.dictionary[this.position[0]]);
        this.element.css('left', Board.dictionary[this.position[1]]);

        //if piece reaches the end of the row on opposite side crown it a king (can move all directions)
        if (!this.king && (this.position[0] == 0 || this.position[0] == 7)) {
            this.makeKing();
            return true;
        }
    }

    // Checks werther the piece can jump anywhere
    static canJumpAny () {
        return (
            this.canOpponentJump([this.position[0] + 2, this.position[1] + 2]) ||
            this.canOpponentJump([this.position[0] + 2, this.position[1] - 2]) ||
            this.canOpponentJump([this.position[0] - 2, this.position[1] + 2]) ||
            this.canOpponentJump([this.position[0] - 2, this.position[1] - 2])
        )
    }

    static canOpponentJump(newPosition) {
        // Find what the displacement is
        const dx = newPosition[1] - this.position[1];
        const dy = newPosition[0] - this.position[0];

        // Ensures the object doesn't go backwards if not a king
        if (this.player === 1 && this.king === false) {
            if (newPosition[0] < this.position[0]) return false;
        } else if (this.player === 2 && this.king === false) {
            if (newPosition[0] > this.position[0]) return false;
        }

        // The new position must be in bounds
        if (newPosition[0] > 7 || newPosition[1] > 7 || newPosition[0] < 0 || newPosition[1] < 0) return false;

        // middle tile where the piece to be conquered sits
        const tileToCheckX = this.position[1] + dx / 2;
        const tileToCheckY = this.position[0] + dy / 2;
        if (tileToCheckX > 7 || tileToCheckY > 7 || tileToCheckX < 0 || tileToCheckY < 0) return false;

        // if there is a piece there and there is no piece in the space after that
        if (!Board.isValidPlacetoMove(tileToCheckY, tileToCheckX) && Board.isValidPlacetoMove(newPosition[0], newPosition[1])) {
            //find which object instance is sitting there
            for (let pieceIndex in pieces) {
              if (pieces[pieceIndex].position[0] === tileToCheckY && pieces[pieceIndex].position[1] === tileToCheckX) {
                if (this.player !== pieces[pieceIndex].player) {
                  //return the piece sitting there
                  return pieces[pieceIndex];
                }
              }
            }
        }
        return false;
    }

    static opponentJump(tile) {
        const pieceToRemove = this.canOpponentJump(tile.position);
        // If there is a piece to be removed, remove
        if (pieceToRemove) {
            pieceToRemove.remove();
            return true;
        }
        return false;
    }

    static remove() {
        // Remove the piece
        this.element.css("display", "none");
        if (this.player === 1) {
            $('#player2').append("<div class='capturedPiece'></div>");
            Board.score.player2 += 1;
        }
        if (this.player === 2) {
            $('#player1').append("<div class='capturedPiece'></div>");
            Board.score.player1 += 1;
        }
        Board.board[this.position[0]][this.position[1]] = 0;

        //reset position so it doesn't get picked up by the for loop in the canOpponentJump method
        this.position = [];
        var playerWon = Board.checkifAnybodyWon();
        if (playerWon) {
            $('#winner').html("Player " + playerWon + " has won!");
        }
    }
}
