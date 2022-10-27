<script>
export default {
  name: "checkerBoard",
  data() {
    return {
      pieces:
          [
            ["piece1", "black piece"],
            ["piece2", "black piece"],
            ["piece3", "black piece"],
            ["piece4", "black piece"],
            ["piece5", "black piece"],
            ["piece6", "black piece"],
            ["piece7", "black piece"],
            ["piece8", "black piece"],
            ["piece9", "black piece"],
            ["piece10", "black piece"],
            ["piece11", "black piece"],
            ["piece12", "black piece"],
            ["piece13", "black piece"],
            ["piece14", "black piece"],
            ["piece15", "black piece"],
            ["piece16", "black piece"],
            ["piece17", "black piece"],
            ["piece18", "black piece"],
            ["piece19", "black piece"],
            ["piece20", "black piece"],
            ["piece21", "none"],
            ["piece22", "none"],
            ["piece23", "none"],
            ["piece24", "none"],
            ["piece25", "none"],
            ["piece26", "none"],
            ["piece27", "none"],
            ["piece28", "none"],
            ["piece29", "none"],
            ["piece30", "none"],
            ["piece31", "white"],
            ["piece32", "white"],
            ["piece33", "white"],
            ["piece34", "white"],
            ["piece35", "white"],
            ["piece36", "white"],
            ["piece37", "white"],
            ["piece38", "white"],
            ["piece39", "white"],
            ["piece40", "white"],
            ["piece41", "white"],
            ["piece42", "white"],
            ["piece43", "white"],
            ["piece44", "white"],
            ["piece45", "white"],
            ["piece46", "white"],
            ["piece47", "white"],
            ["piece48", "white"],
            ["piece49", "white"],
            ["piece50", "white"]
          ]
      ,
    }
  },
  methods: {
    changePieceClass(id){
      return this.pieces.find((val)=>val[0]===id)[1];
    }
  }
}
</script>

<template>
  <svg width="40.4vw" height="40.4vw">
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="0" :id="'r1_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+i)" :cx="6 + (8*(i-1)) + 'vw'" cy="2vw" :id="'piece' +i"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="4vw" :id="'r2_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (5+i))" :cx="2 + (8*(i-1)) + 'vw'" cy="6vw" :id="'piece'+ (5+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="8vw" :id="'r3_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (10+i))" :cx="6 + (8*(i-1)) + 'vw'" cy="10vw" :id="'piece'+ (10+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="12vw" :id="'r4_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (15+i))" :cx="2 + (8*(i-1)) + 'vw'" cy="14vw" :id="'piece'+ (15+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="16vw" :id="'r5_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (20+i))" :cx="6 + (8*(i-1)) + 'vw'" cy="18vw" :id="'piece'+ (20+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="20vw" :id="'r6_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (25+i))" :cx="2 + (8*(i-1)) + 'vw'" cy="22vw" :id="'piece'+ (25+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="24vw" :id="'r7_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (30+i))" :cx="6 + (8*(i-1)) + 'vw'" cy="26vw" :id="'piece'+ (30+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="28vw" :id="'r8_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (35+i))" :cx="2 + (8*(i-1)) + 'vw'" cy="30vw" :id="'piece'+ (35+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="32vw" :id="'r9_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (40+i))" :cx="6 + (8*(i-1)) + 'vw'" cy="34vw" :id="'piece'+ (40+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="36vw" :id="'r10_sq'+i"/>
    <circle v-for="i in 5" :key="i" :class="changePieceClass('piece'+ (45+i))" :cx="2 + (8*(i-1)) + 'vw'" cy="38vw" :id="'piece'+ (45+i)"/>
  </svg>
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