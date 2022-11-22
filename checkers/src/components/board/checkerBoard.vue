<script>
import $ from 'jquery'
export default {
  name: "checkerBoard",
  data() {
    return {
      gameBoard: [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0]
      ],
      pieces: [],
      tiles: [],

    }
  },
  methods: {
    dist(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    },

    Piece(element, position) {
      // when jump exist, regular move is not allowed
      // since there is no jump at round 1, all pieces are allowed to move initially
      this.allowedtomove = true;
      //linked DOM element
      this.element = element;
      //positions on gameBoard array in format row, column
      this.position = position;
      //which player's piece i it
      this.player = '';
      //figure out player by piece id
      if (this.element.attr("id") < 12)
        this.player = 1;
      else
        this.player = 2;
      //makes object a king
      this.king = false;
      this.makeKing = function () {
        this.element.css("backgroundImage", "url('img/king" + this.player + ".png')");
        this.king = true;
      }
      //moves the piece
      this.move = function (tile) {
        this.element.removeClass('selected');
        if (!Board.isValidPlacetoMove(tile.position[0], tile.position[1])) return false;
        //make sure piece doesn't go backwards if it's not a king
        if (this.player == 1 && this.king == false) {
          if (tile.position[0] < this.position[0]) return false;
        } else if (this.player == 2 && this.king == false) {
          if (tile.position[0] > this.position[0]) return false;
        }
        //remove the mark from Board.board and put it in the new spot
        Board.board[this.position[0]][this.position[1]] = 0;
        Board.board[tile.position[0]][tile.position[1]] = this.player;
        this.position = [tile.position[0], tile.position[1]];
        //change the css using board's dictionary
        this.element.css('top', Board.dictionary[this.position[0]]);
        this.element.css('left', Board.dictionary[this.position[1]]);
        //if piece reaches the end of the row on opposite side crown it a king (can move all directions)
        if (!this.king && (this.position[0] == 0 || this.position[0] == 7))
          this.makeKing();
        return true;
      };

      //tests if piece can jump anywhere
      this.canJumpAny = function () {
        return (this.canOpponentJump([this.position[0] + 2, this.position[1] + 2]) ||
            this.canOpponentJump([this.position[0] + 2, this.position[1] - 2]) ||
            this.canOpponentJump([this.position[0] - 2, this.position[1] + 2]) ||
            this.canOpponentJump([this.position[0] - 2, this.position[1] - 2]))
      };

      //tests if an opponent jump can be made to a specific place
      this.canOpponentJump = function (newPosition) {
        //find what the displacement is
        var dx = newPosition[1] - this.position[1];
        var dy = newPosition[0] - this.position[0];
        //make sure object doesn't go backwards if not a king
        if (this.player == 1 && this.king == false) {
          if (newPosition[0] < this.position[0]) return false;
        } else if (this.player == 2 && this.king == false) {
          if (newPosition[0] > this.position[0]) return false;
        }
        //must be in bounds
        if (newPosition[0] > 7 || newPosition[1] > 7 || newPosition[0] < 0 || newPosition[1] < 0) return false;
        //middle tile where the piece to be conquered sits
        var tileToCheckx = this.position[1] + dx / 2;
        var tileToChecky = this.position[0] + dy / 2;
        if (tileToCheckx > 7 || tileToChecky > 7 || tileToCheckx < 0 || tileToChecky < 0) return false;
        //if there is a piece there and there is no piece in the space after that
        if (!Board.isValidPlacetoMove(tileToChecky, tileToCheckx) && Board.isValidPlacetoMove(newPosition[0], newPosition[1])) {
          //find which object instance is sitting there
          for (let pieceIndex in pieces) {
            if (pieces[pieceIndex].position[0] == tileToChecky && pieces[pieceIndex].position[1] == tileToCheckx) {
              if (this.player != pieces[pieceIndex].player) {
                //return the piece sitting there
                return pieces[pieceIndex];
              }
            }
          }
        }
        return false;
      };

      this.opponentJump = function (tile) {
        var pieceToRemove = this.canOpponentJump(tile.position);
        //if there is a piece to be removed, remove it
        if (pieceToRemove) {
          pieceToRemove.remove();
          return true;
        }
        return false;
      };

      this.remove = function () {
        //remove it and delete it from the gameboard
        this.element.css("display", "none");
        if (this.player == 1) {
          $('#player2').append("<div class='capturedPiece'></div>");
          Board.score.player2 += 1;
        }
        if (this.player == 2) {
          $('#player1').append("<div class='capturedPiece'></div>");
          Board.score.player1 += 1;
        }
        Board.board[this.position[0]][this.position[1]] = 0;
        //reset position so it doesn't get picked up by the for loop in the canOpponentJump method
        this.position = [];
        var playerWon = this.Board.checkifAnybodyWon();
        if (playerWon) {
          $('#winner').html("Player " + playerWon + " has won!");
        }
      }
    },

    Tile(element, position) {
      //linked DOM element
      this.element = element;
      //position in gameboard
      this.position = position;
      //if tile is in range from the piece
      this.inRange = function (piece) {
        for (let k of this.pieces)
          if (k.position[0] == this.position[0] && k.position[1] == this.position[1]) return 'wrong';
        if (!piece.king && piece.player == 1 && this.position[0] < piece.position[0]) return 'wrong';
        if (!piece.king && piece.player == 2 && this.position[0] > piece.position[0]) return 'wrong';
        if (this.dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == Math.sqrt(2)) {
          //regular move
          return 'regular';
        } else if (this.dist(this.position[0], this.position[1], piece.position[0], piece.position[1]) == 2 * Math.sqrt(2)) {
          //jump move
          return 'jump';
        }
      };
    }
  }
}
</script>

<template>
  <div class="column">
    <div class="info">
      <h1>Checkers</h1>
      <hr>
      <p>Made by codethejason for <a href="http://fossasia.org">FOSSASIA</a> 2015.</p>
    </div>
    <div class="stats">
      <h2>Game Statistics</h2>
      <div class="wrapper">
        <div id="player1">
          <h3>Player 1 (Top)</h3>
        </div>
        <div id="player2">
          <h3>Player 2 (Bottom)</h3>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="turn"></div>
      <span id="winner"></span>
      <button id="cleargame">Reset Game</button>
    </div>
  </div>
  <div class="column">
    <div id="board">
      <div class="tiles"></div>
      <div class="pieces">
        <div class="player1pieces">
        </div>
        <div class="player2pieces">
        </div>
      </div>
    </div>
  </div>
  <!--  Rules modal popup-->
  <label for="my-modal-4" class="btn modal-button bg-primary hover:bg-primary-focus ml-20">Rules</label>
  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
  <label for="my-modal-4" class="modal cursor-pointer">
    <label class="modal-box relative w-11/12 max-w-5xl" for="">
      <h2>Rules</h2><br>
      1. Leg het dambord zo, dat het hoekveld linksonder een donker vakje is. Er wordt op de donkere velden gedamd.<br>
      2. Wit begint en doet de eerste zet.<br>
      3. Een schijf wordt één vakje schuin vooruit geschoven.<br>
      4. Een schijf kan vooruit en achteruit slaan.<br>
      5. Een schijf die aan de overkant van het dambord komt, wordt een dam. Let op: een schijf die tijdens het slaan de overkant van het dambord passeert maar weer terug moet om nog meer schijven te slaan, blijft een schijf.<br>
      6. Een dam wordt één of meer vakjes schuin vooruit of schuin achteruit geschoven.<br>
      7. Een dam kan vooruit en achteruit slaan. Je hoeft de dam na de slag niet vlak achter de laatste geslagen schijf te zetten.<br>
      8. Slaan is verplicht.<br>
      9. Meerslag gaat voor.<br>
      10. Als je met een dam en met een schijf evenveel stukken kunt slaan, mag je kiezen. Dus: damslag gaat niet voor!<br>
      11. Pas na het slaan mag je de geslagen stukken van het bord pakken.<br>
      12. Tijdens het slaan mag je niet twee keer over hetzelfde stuk. Wel twee keer over hetzelfde lege veld.<br>
      13. Aanraken is zetten: als je een dam of schijf aanraakt waar je een reglementaire zet mee kunt doen, dan moet je met dát stuk een zet doen.<br>
      14. Als je tegenstander een zet doet die niet volgens de spelregels is (bijvoorbeeld hij vergeet te slaan, of hij slaat te weinig stukken), dan is het sportief om dat tegen hem te zeggen en hem te laten terugzetten. Maar je mag ook gewoon doorspelen.<br>
      15. Wie geen zet meer kan doen, heeft de partij verloren.<br>
      16. Als niemand meer kan winnen, dan is het remise (gelijkspel). Let op: het kan ook remise zijn als jij en je tegenstander niet hetzelfde aantal stukken hebben!<br>
    </label>
  </label>
</template>

<style scoped>
svg {
  border: 0.2vw lightgray solid;
  box-shadow: 5px 10px 5px gray;
  position: absolute;
  left: 30vw;

}
circle {
  r: 1.5vw;
}
.square {
  width: 4vw;
  height: 4vw;
}

.black {
  fill: rgb(0, 0, 0);
}

.white {
  fill: rgb(255, 255, 255);
}

.piece {
  stroke: rgb(255, 255, 255);
  stroke-width: 2px;
}

.none {
  fill: none;
}
</style>