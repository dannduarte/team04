export class tile {
    element; // = to which DOM element the tile is linked
    position; // = the position in the gameBoard array in format row, column

    // = is the tile in range from the piece
    inRange (piece) {
        for (let k of this.pieces) {
            if (k.position[0] === this.position[0] && k.position[1] === this.position[1]) return 'wrong';
            if (!piece.king && piece.player === 1 && this.position[0] < piece.position[0]) return 'wrong';
            if (!piece.king && piece.player === 2 && this.position[0] > piece.position[0]) return 'wrong';
            if (this.dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) === Math.sqrt(2)) {
                // Regular move
                return 'regular';
            } else if (this.dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) === 2 * Math.sqrt(2)) {
                // Jump move
                return 'jump';
            }
        }
    }
}
