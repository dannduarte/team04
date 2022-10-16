<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <div class="dropdown">
      <button class="dropbtn">Games</button>
      <div class="dropdown-content">
        <router-link to="/game">All Games Overview</router-link> <br>
        <router-link to="/board">To board</router-link> <br>
        <a href="#">Game details </a>
        <a href="#">Games edit </a>
      </div>
    </div>
    <a href="">Play</a>
    <a href="">My Account</a>

    <!-- Right aligned nav items -->
    <div class="rightSection">
    <a href="">Sign up</a>
    <a href="">Log in</a>
    </div>
  </nav>
</template>
