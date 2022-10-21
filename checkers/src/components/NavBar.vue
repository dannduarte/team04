<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <div class="dropdown">
      <button class="dropbtn">Games</button>
      <div class="dropdown-content">
        <router-link to="/game">All Games Overview</router-link>
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
