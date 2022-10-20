app.vue

<template>
  <HomeHeader/>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import HomeHeader from './components/HomeHeader.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    HomeHeader,
  }
}
</script>

