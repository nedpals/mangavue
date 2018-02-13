<template>
<div>
	<section class="search-page">
		<section class="hero is-primary is-bold">
		  <div class="hero-body">
		    <div class="container">
		      <h1 class="title">
		        Search results for: {{ query }}
		      </h1>
		    </div>
		  </div>
		</section>
		<manga-list :items="results"></manga-list>
	</section>
</div>
</template>

<script>
import { mapState } from 'vuex'
import MangaList from 'components/MangaList'

export default {
	watch: {
		'$route' (to, from) {
			this.loadResult();
		}
	},
	mounted() {
		this.loadResult();
	},
	computed: {
		...mapState({
			results: state => state.search.results,
			search: state => state.search
		}),
		query() {
			return this.$route.query.q
		}
	},
	methods: {
		loadResult() {
			if (this.results === []) {
				this.$store.dispatch('LOAD_SEARCH_RESULTS');
			}
		}
  },
  components: {
    MangaList
  }
}
</script>

<style>
.search-page, .genre-page {
	margin-top: -3.3rem !important;
}
.container {
	margin-top: 30px !important;
}
</style>
