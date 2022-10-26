<script>
export default {
  name: "checkerboardPiece",
  props: [
      'squareName',
      'pieces',
      'className'
  ],
  methods:{
    test() {
      console.log(this.pieces[17][1])
      console.log(this.pieces[1].indexOf("r1-sq5_2"))
    }
  }
}

</script>

<template>
  <rect class="black" x="40" y="0" width="40" height="40"></rect>
</template>

<style scoped>
.black {
  fill: rgb(0, 0, 0);
}
</style>