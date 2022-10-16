<script>
export default {
  name: "checkerboardPiece",
  props: [
    'squareName'
  ]
}

</script>

<template>
  <g translate="yes">
    <rect class="white" x="0" y="0" width="40" height="40" :id="this.squareName + '_1'"/>
    <rect class="black" x="40" y="0" width="40" height="40" :id="this.squareName + '_2'"/>
    <rect class="black" x="0" y="40" width="40" height="40" :id="this.squareName + '_3'"/>
    <rect class="white" x="40" y="40" width="40" height="40" :id="this.squareName + '_4'"/>
  </g>
</template>

<style scoped>
.black {
  fill: rgb(0, 0, 0);
}

.white {
  fill: rgb(255, 255, 255);
}
</style>