<template>
  <div id="app">
    <navbar></navbar>
    <keep-alive>
      <router-view class="wrapper container"></router-view>
      <router-view name="wide" class="wrapper container-fluid"></router-view>
    </keep-alive>
  </div>
</template>
<style src="../../static/assets/scss/font-awesome.scss" lang="sass"></style>
<style>
body {
  margin-bottom: 5rem !important;
  margin-top: 5rem !important;
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
