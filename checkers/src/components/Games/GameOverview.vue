<template>
  <h1>Here you find our most recent games:</h1>
  <table class="wf-table">
    <tr>
      <th>Id:</th>
      <th>Title:</th>
      <th>Created at:</th>
      <th>Status:</th>
      <th>Max think time:</th>
      <th>Rated:</th>
    </tr>
    <tr v-for="(game,index) of games" v-bind:key="index">
      <td class="center">{{game.id}}</td>
      <td class="left">{{game.title}}</td>
      <td class="right">{{game.createdAt}}</td>
      <td class="left">{{game.status}}</td>
      <td v-if="game.rated == true" class="center">{{game.maxThinkTime}}</td>
      <td v-else class="center"></td>
      <td class="center">{{game.rated}}</td>
    </tr>
  </table>
  <button class="wf-button"
          v-on:click="newGame()">New Game</button>
</template>

<script>
import {Game} from "@/models/game";

export default {
  name: "GameOverview",
  created() {
    this.lastGameId = 30000;
    this.loadGames();
  },
  data() {
    return {
      games: []
    }
  },
  methods: {
    loadGames() {
      this.games = [];
      for (let i = 0; i < 8; i++) {
        this.games.push(Game.createSampleGame(this.lastGameId += 3));
      }
    },
    newGame() {
        this.games.push(Game.createSampleGame(this.lastGameId += 3));
    }
  }
}
</script>
