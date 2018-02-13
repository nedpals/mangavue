<template>
<div id="fullpage">
    <div class="section" style="padding-bottom:0;">
      <div class="columns">
        <div class="column is-8 is-offset-2  has-text-centered">
          <h1><img src="../../static/mascot.png" style="max-width: 30%;" /></h1>
          <h1 class="title is-1">Mangavue</h1>
          <h1 class="subtitle">Manga Reader powered by Vue.</h1>
          <search-box-big v-bind:value="searchQuery"></search-box-big>
        </div>
      </div>
      <div class="columns">
        <div class="column is-11 is-offset-1 has-text-centered">
          <ul style="list-style-type:none;">
            <li style="display: inline; margin-right: 2px;" :key="genre.genreId" v-for="genre in genres">
              <router-link :to="{name: 'genre', params: {genreName: genre.genreId}}">
                <span style="margin: 2px;" class="tag is-medium is-primary">{{ genre.genreId }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
</div>
</template>
<style scoped>
body {
  margin: 0 !important;
}
</style>

<script>
import SearchBoxBig from 'components/SearchBoxBig'
import { mapState } from 'vuex'

export default {
  components: {
    SearchBoxBig
  },
  mounted() {
    this.$store.dispatch('LOAD_GENRES')
  },
  computed: {
		...mapState({
		  searchQuery: state => state.search.query,
		  genres: state => state.search.genres
		})
  }
}
</script>
