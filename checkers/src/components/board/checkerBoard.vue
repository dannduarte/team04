<template>
  <!--    <div class="hero-overlay bg-opacity-60"></div>-->
  <!--  Rules modal popup-->
  <label class="btn modal-button bg-primary hover:bg-primary-focus ml-20" for="my-modal-4">Rules</label>
  <input id="my-modal-4" class="modal-toggle" type="checkbox"/>
  <label class="modal cursor-pointer" for="my-modal-4">
    <label class="modal-box relative w-11/12 max-w-5xl" for="">
      Starting of the game:<br>
      The player with the light color starts the game.<br>
      <br>
      Moving the pieces:<br>
      Pieces can only be put on black tiles.<br>
      That is why pieces move diagonally.<br>
      Pieces can move forward one tile at a time.<br>
      Pieces can only move towards their opponent and it can only be placed on a tile that not is occupied.<br>
      <br>
      Capturing pieces:<br>
      To capture a piece, your piece jumps over one of the opponent's pieces.<br>
      Your piece will land on the other side of the opponent's piece.<br>
      This must be done in a straight diagonal line and the landing tile must be empty.<br>
      If there is a possibility to capture another piece after your piece has landed than you must do so.<br>
      <br>
      King:<br>
      When a piece reaches the other side of the board thad piece becomes a king.<br>
      A king can also move backwards and can move multiple tiles as long as it is in one diagonal line.<br>
    </label>
  </label>

  <!-- Timer and who has the turn -->
  <div class="flex w-full" style="width: 40.4vw; position: absolute; left: 30vw; min-width: 450px">
    <div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
          <span :class="{hasTurn : this.playerAtTurn === 2 }" class="stat-value"
                style="display:inline">Player 1: Dark</span>
      Score: {{ scorePlayer1 }}
    </div>
    <div class="divider divider-horizontal">{{ timer }}</div>
    <div class="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          <span :class="{hasTurn : this.playerAtTurn === 1 }" class="stat-value"
                style="display:inline">Player 2: Light</span>
      Score: {{ scorePlayer2 }}
    </div>
  </div>
    <!-- The game board -->
    <svg height="40.4vw" width="40.4vw">
      <rect v-for="(tile,index) of tiles"
            :id="tile.element"
            :key="index"
            :class="tile.class"
            :x="tile.position[0]"
            :y="tile.position[1]"
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
    <div v-if="gameFinished" id="winnerMessage" class="alert alert-success shadow-lg">
      There is a winner!!!!
    </div>

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
      playerAtTurn: 2, // Standard: White starts,
      timer: 30
    }
  },
  computed: {
    piecesCountBlack: {
      get() {
        const piecesAmount = this.pieces.length;
        let blackCount = 0;

        // Count all the pieces of player 1 (black)
        for (let i = 0; i < piecesAmount; i++) {
          const player = this.pieces[i].player;
          if (player === 1) {
            blackCount += 1;
          }
        }

        return blackCount
      }
    },
    piecesCountWhite: {
      get() {
        const piecesAmount = this.pieces.length;
        let whiteCount = 0;

        // Count all the pieces of player 2 (white)
        for (let i = 0; i < piecesAmount; i++) {
          const player = this.pieces[i].player;
          if (player === 2) {
            whiteCount += 1;
          }
        }

        return whiteCount
      }
    },
    scorePlayer1() {
      return (20 - this.piecesCountWhite)
    },
    scorePlayer2() {
      return (20 - this.piecesCountBlack)
    },
    gameFinished: {
      //
      get() {
        return this.piecesCountWhite === 0 || this.piecesCountBlack === 0;
      }
    }
  },
  watch: {
    timer: {
      handler(value) {
        // This is the actual timer
        if (value > 0) {
          setTimeout(() => {
            this.timer--;
          }, 1000);
        }

        // Switch player when the timer hits 0
        if (this.timer === 0) {
          if (this.playerAtTurn === 1) {
            this.playerAtTurn = 2
          } else {
            this.playerAtTurn = 1
          }
          // Set the timer back to 30 seconds
          this.timer = 30;
          // Deselect piece
          this.selectedPiece = null;
        }

      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },
  methods: {
    selectPiece(piece) {
      // Look werther the piece selected is from the player who it is
      if (this.playerAtTurn === piece.player) {
        if (piece !== this.selectedPiece) {
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
          if (this.playerAtTurn === 1) {
            this.playerAtTurn = 2
          } else {
            this.playerAtTurn = 1
          }
          // reset the timer to 30 seconds
          this.timer = 30;
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

.hasTurn {
  font-weight: bold;
  font-size: large;
}

#winnerMessage {
  width: 30vw;
  position: absolute;
  left: 35vw;
  top: 45vh;
}
</style>