<script>
import checkerboardPiece from "./checkerboardPiece.vue"
export default {
  name: "checkerBoard",
  components: {
    checkerboardPiece
  },
}
</script>

<template>
  <svg width="400" height="400">
    <checkerboardPiece v-for="i in 5" :id="'r1-sq' + i" :key="i" :transform='"translate(" + (i-1)*80 +",0)"' :squareName="'r1-sq' + i" />
    <checkerboardPiece v-for="i in 5" :id="'r2-sq' + i" :key="i" :transform='"translate(" + (i-1)*80 +",80)"' :squareName="'r1-sq' + i" />
    <checkerboardPiece v-for="i in 5" :id="'r3-sq' + i" :key="i" :transform='"translate(" + (i-1)*80 +",160)"' :squareName="'r1-sq' + i" />
    <checkerboardPiece v-for="i in 5" :id="'r4-sq' + i" :key="i" :transform='"translate(" + (i-1)*80 +",240)"' :squareName="'r1-sq' + i" />
    <checkerboardPiece v-for="i in 5" :id="'r5-sq' + i" :key="i" :transform='"translate(" + (i-1)*80 +",320)"' :squareName="'r1-sq' + i" />
  </svg>
</template>

<style scoped>

</style>