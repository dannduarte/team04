<template>
  <div class="header flex-container">
    <div>
      <h1 class="text-5xl font-bold underline">Checkers</h1>
    </div>
    <div class="offered">
      <h2>{{currentDate()}}</h2>
    </div>
  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  methods: {
    currentDate() {
      const date = new Date();
      let formatDate = moment(date).format('ddd DD, MMM YYYY');
      return `today is `+ formatDate;
    }
  }
};
</script>
