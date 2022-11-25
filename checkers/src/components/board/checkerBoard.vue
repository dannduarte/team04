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

  <svg width="40.4vw" height="40.4vw">
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="0" :id="'sq'+ i"/>
    <circle v-for="i in 5" :key="i" class="bPiece" :cx="6 + (8*(i-1)) + 'vw'" cy="2vw" :id="'piece' +i"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="4vw" :id="'sq'+ (i+10)"/>
    <circle v-for="i in 5" :key="i" class="bPiece" :cx="2 + (8*(i-1)) + 'vw'" cy="6vw" :id="'piece'+ (5+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="8vw" :id="'sq'+ (i+20)"/>
    <circle v-for="i in 5" :key="i" class="bPiece" :cx="6 + (8*(i-1)) + 'vw'" cy="10vw" :id="'piece'+ (10+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="12vw" :id="'sq'+ (i+30)"/>
    <circle v-for="i in 5" :key="i" class="bPiece" :cx="2 + (8*(i-1)) + 'vw'" cy="14vw" :id="'piece'+ (15+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="16vw" :id="'sq'+ (i+40)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="20vw" :id="'sq'+ (i+50)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="24vw" :id="'sq'+ (i+60)"/>
    <circle v-for="i in 5" :key="i" class="wPiece" :cx="6 + (8*(i-1)) + 'vw'" cy="26vw" :id="'piece'+ (20+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="28vw" :id="'sq'+ (i+70)"/>
    <circle v-for="i in 5" :key="i" class="wPiece" :cx="2 + (8*(i-1)) + 'vw'" cy="30vw" :id="'piece'+ (25+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="32vw" :id="'sq'+ (i+80)"/>
    <circle v-for="i in 5" :key="i" class="wPiece" :cx="6 + (8*(i-1)) + 'vw'" cy="34vw" :id="'piece'+ (30+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="36vw" :id="'sq'+ (i+90)"/>
    <circle v-for="i in 5" :key="i" class="wPiece" :cx="2 + (8*(i-1)) + 'vw'" cy="38vw" :id="'piece'+ (35+i)"/>
  </svg>

</template>

<script>
import { Piece } from "@/models/piece.js"
// import {tile} from "@/models/tile.js"

export default {
  name: "checkerBoard",
  data() {
    return {
      gameBoard: [
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0, 2, 0]
      ],
      pieces: [],
      tiles: [],
    }
  },
  methods: {
    // distance formula
    dist(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    },
  },
  created() {
    // Assign all the pieces
    for ( let i = 1 ; i <= 20 ; i++){
      this.pieces.push( Piece.createPieces('piece'+i ) )
    }
    for ( let i = 21 ; i <= 40 ; i++){
      this.pieces.push( Piece.createPieces('piece'+i ) )
    }
    console.log(this.pieces)
  }
}
</script>

<style scoped>
svg {
  border: 0.2vw #0078d5 solid;
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
  fill: rgb(50, 50, 68);
}
.white {
  fill: rgb(111, 119, 164);
}

.wPiece {
  fill: #8d91ab;
}
.bPiece{
  fill: #52526e;
}
.none {
  fill: none;
}
</style>