<script>
// import checkerboardPiece from "./checkerboardPiece.vue"
export default {
  name: "checkerBoard",
  components: {
    // checkerboardPiece
  },
  data() {
    return {
    pieces:
        [
          ["r1-sq1_2","black"],
          ["r1-sq1_3","black"],
          ["r1-sq2_2","black"],
          ["r1-sq2_3","black"],
          ["r1-sq3_2","black"],
          ["r1-sq3_3","black"],
          ["r1-sq4_2","black"],
          ["r1-sq4_3","black"],
          ["r1-sq5_2","black"],
          ["r1-sq5_3","black"],
          ["r2-sq1_2","black"],
          ["r2-sq1_3","black"],
          ["r2-sq2_2","black"],
          ["r2-sq2_3","black"],
          ["r2-sq3_2","black"],
          ["r2-sq3_3","none"],
          ["r2-sq4_2","none"],
          ["r2-sq4_3","none"],
          ["r2-sq5_2","none"],
          ["r2-sq5_3","none"],
          ["r3-sq1_2","none"],
          ["r3-sq1_3","none"],
          ["r3-sq2_2","none"],
          ["r3-sq2_3","none"],
          ["r3-sq3_2","none"],
          ["r3-sq3_3","none"],
          ["r3-sq4_2","none"],
          ["r3-sq4_3","none"],
          ["r3-sq5_2","none"],
          ["r3-sq5_3","none"],
          ["r4-sq1_2","none"],
          ["r4-sq1_3","none"],
          ["r4-sq2_2","none"],
          ["r4-sq2_3","none"],
          ["r4-sq3_2","none"],
          ["r4-sq3_3","white"],
          ["r4-sq4_2","white"],
          ["r4-sq4_3","white"],
          ["r4-sq5_2","white"],
          ["r4-sq5_3","white"],
          ["r5-sq1_2","white"],
          ["r5-sq1_3","white"],
          ["r5-sq2_2","white"],
          ["r5-sq2_3","white"],
          ["r5-sq3_2","white"],
          ["r5-sq3_3","white"],
          ["r5-sq4_2","white"],
          ["r5-sq4_3","white"],
          ["r5-sq5_2","white"],
          ["r5-sq5_3","white"]
        ],

    }
  }
}
</script>

<template>
  <svg width="40.4vw" height="40.4vw">
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="0" :id="'r1_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="black piece" :cx="6 + (8*(i-1)) + 'vw'" cy="2vw" :id="'piece' +i"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="4vw" :id="'r2_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="black piece" :cx="2 + (8*(i-1)) + 'vw'" cy="6vw" :id="'piece'+ (5+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="8vw" :id="'r3_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="black piece" :cx="6 + (8*(i-1)) + 'vw'" cy="10vw" :id="'piece'+ (10+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="12vw" :id="'r4_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="black piece" :cx="2 + (8*(i-1)) + 'vw'" cy="14vw" :id="'piece'+ (15+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="16vw" :id="'r5_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="none" :cx="6 + (8*(i-1)) + 'vw'" cy="18vw" :id="'piece'+ (20+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="20vw" :id="'r6_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="none" :cx="2 + (8*(i-1)) + 'vw'" cy="22vw" :id="'piece'+ (25+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="24vw" :id="'r7_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="white" :cx="6 + (8*(i-1)) + 'vw'" cy="26vw" :id="'piece'+ (30+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="28vw" :id="'r8_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="white" :cx="2 + (8*(i-1)) + 'vw'" cy="30vw" :id="'piece'+ (35+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===0,'white':i%2===1}" class="square" :x="4*(i-1)+'vw'" y="32vw" :id="'r9_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="white" :cx="6 + (8*(i-1)) + 'vw'" cy="34vw" :id="'piece'+ (40+i)"/>
    <rect v-for="i in 10" :key="i" :class="{'black':i%2===1,'white':i%2===0}" class="square" :x="4*(i-1)+'vw'" y="36vw" :id="'r10_sq'+i"/>
    <circle v-for="i in 5" :key="i" class="white" :cx="2 + (8*(i-1)) + 'vw'" cy="38vw" :id="'piece'+ (45+i)"/>
  </svg>
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
  stroke: rgb(255,255,255);
  stroke-width: 2px;
}
</style>