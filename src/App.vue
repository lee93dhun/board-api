<template>
  <div id="app">
    <header-section></header-section>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue';

export default {
  name: 'App',
  components:{
    HeaderSection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  width: 1100px;
  margin: 0 auto;
}
</style>
