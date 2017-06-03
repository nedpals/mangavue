<template>
  <div id="app">
    <navbar></navbar>
    <keep-alive>
      <router-view class="wrapper container"></router-view>
      <router-view name="wide" class="wrapper container-fluid"></router-view>
    </keep-alive>
  </div>
</template>

<style>
body {
  margin-bottom: 3rem;
}
</style>

<script>
  import Navbar from './Navbar'
  import '../../static/assets/bulma.css'

  export default {
    components: {
      Navbar
    }
  }
</script>