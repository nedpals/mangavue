<template>
<div style="padding:1rem;">
	<div class="columns">
		<div class="column is-8 is-offset-2  has-text-centered">
			<h1 class="is-hidden-tablet title is-2">Manga Reader powered by Vue.</h1>
			<h1 class="is-hidden-mobile title is-1">Manga Reader powered by Vue.</h1>
			<search-box-big v-bind:value="searchQuery"></search-box-big>
		</div>
	</div>
	<div class="columns">
		<div class="column is-10 is-offset-1 has-text-centered">
			<ul style="list-style-type:none;">
				<li style="display: inline; margin-right: 2px;" v-for="genre in genres">
					<router-link :to="{name: 'genre', params: {genreName: genre.genreId}}">
						<span style="margin: 2px;" class="tag is-medium is-primary">{{ genre.genreId }}</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
import SearchBoxBig from 'components/SearchBoxBig'
import { mapState } from 'vuex'

export default {
  components: {
    SearchBoxBig
  },
  mounted() {
			this.$store.dispatch('LOAD_GENRES');
  },
  computed: {
		...mapState({
		  searchQuery: state => state.search.query,
		  genres: state => state.search.genres
		})
  }
}
</script>
