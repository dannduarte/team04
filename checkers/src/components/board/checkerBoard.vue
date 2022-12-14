<template>
  <div class="column">
    <div class="info">
      <h1>Checkers</h1>
      <hr>
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
<!--    <label class="modal-box relative w-11/12 max-w-5xl" for="">-->
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
<!--    </label>-->
  </label>

  <!-- The game board -->
  <svg width="40.4vw" height="40.4vw">
    <rect v-for="(tile,index) of tiles"
          :key="index"
          :class="tile.class"
          :x="tile.position[0]"
          :y="tile.position[1]"
          :id="tile.element"
          @click="movePiece(tile)"
          width="4vw"
          height="4vw"
    />
    <circle v-for="(piece,index) of pieces"
            :key="index"
            :class="[
                piece.pieceColor,
                {selected: this.selectedPiece === piece},
                {king: piece.king === true}]"
            :cx="piece.position[0]"
            :cy="piece.position[1]"
            :id="piece.element"
            r="1.5vw"
            @click="selectPiece(piece)"
    />
  </svg>
</template>

<script>
import { Piece } from "@/models/piece.js"
import {Tile} from "@/models/tile.js"

export default {
  name: "checkerBoard",
  data() {
    return {
      pieces: [],
      tiles: [],
      selectedPiece: null,
      playerAtTurn: 2 // Standard: White starts
    }
  },
  methods: {
    selectPiece(piece) {
      // Look werther the piece selected is from the player who it is
      if (this.playerAtTurn === piece.player) {
        if(piece !== this.selectedPiece) {
          this.selectedPiece = piece;
        } else {
          this.selectedPiece = null;
        }
      }
    },
    movePiece(tile){
      if (tile.class === "white") {
        console.log("White can't be selected")
      } else if (this.selectedPiece === null) {
        console.log("No piece selected")
      } else {
        // Move piece
        const isMoved = this.selectedPiece.movePiece(tile, this.pieces);

        // If the piece has been moved the turn is given to the opponent
        if (isMoved === true) {
          if (this.playerAtTurn === 1){
            this.playerAtTurn = 2
          } else {
            this.playerAtTurn = 1
          }
        }

        // Deselect piece
        this.selectedPiece = null;
      }
    }
  },
  created() {
    // Initiate the pieces and the board
    // Create the pieces in pieces[]
    for ( let i = 1 ; i <= 20 ; i++){
      this.pieces.push( Piece.createPieces('piece'+i ) )
    }
    for ( let i = 21 ; i <= 40 ; i++){
      this.pieces.push( Piece.createPieces('piece'+i ) )
    }
    // Create the tiles in tiles[] for the board
    for ( let i = 1 ; i <= 100 ; i++){
      this.tiles.push( Tile.createTiles(i, this.tiles) )
    }
  }
}
</script>

<style scoped>
svg {
  border: 0.2vw #0078d5 solid;
  position: absolute;
  left: 30vw;
}
/*The styles of the tiles. These are added when initiated*/
.black {
  fill: rgb(50, 50, 68);
}
.white {
  fill: rgb(111, 119, 164);
}
/*The styles of the pieces. These are added when initiated*/
.wPiece {
  fill: #8d91ab;
}
.bPiece{
  fill: #52526e;
}
.none {
  display: none;
}
.selected {
  filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.9));
}
.king {
  stroke: gold;
  stroke-width: 2px;
}
</style>