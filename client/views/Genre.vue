<template>
<div>
	<section class="genre-page">
			<section class="hero is-primary is-bold">
			  <div class="hero-body">
			    <div class="container">
			      <h1 class="title">
			        Search results for: {{ nameify(genreName) }}
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
	mounted() {
		this.$store.dispatch('LOAD_MANGA_GENRE_LIST')
	},
	computed: {
		...mapState({
			results: state => state.search.genreList,
			genreName: state => state.route.params.genreName
		})
	},
	methods: {
		nameify(str) {
		   str = str.replace(/-/g, " ");
		   var splitStr = str.toLowerCase().split(' ');
		   for (var i = 0; i < splitStr.length; i++) {
		       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		   }
		   return splitStr.join(' ');
		}
  },
  components: {
    MangaList
  }
}
</script>
