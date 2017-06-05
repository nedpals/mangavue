<template>
	<div>
		<section class="hero is-primary is-bold">
		  <div class="hero-body">
		    <div class="container">
		      <h1 class="title">
		        Search results for: {{ query }}
		      </h1>
		    </div>
		  </div>
		</section>
		<div class="container">
			<div class="columns" v-for="item in results">
				<div class="column is-2">
					<figure class="image">
						<img v-bind:src="item.cover" />
					</figure>
				</div>
				<div class="column is-8">
					<p class="title is-3"><router-link :to="{name: 'manga', params: { mangaId: item.mangaId }}"> {{ item.name }} </router-link></p>
					<p v-if="item.info" v-html="item.info"></p>
					<ul class="tags">
						<li v-for="g in item.genres"><router-link :to="{name: 'genre', params: { genreName: g }}"><span class="tag is-info">{{ g }}</span></router-link></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

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
		},
		nameify(str) {
		   str = str.replace(/-/g, " ");
		   var splitStr = str.toLowerCase().split(' ');
		   for (var i = 0; i < splitStr.length; i++) {
		       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		   }
		   return splitStr.join(' ');
		}
	}
}
</script>

<style>
.container {
	margin-top: 30px !important;
}
.tags {
	list-style-type: none;
	margin-top: 8px;
}
.tags li {
	display: inline;
	margin-right: 5px;
}
</style>
