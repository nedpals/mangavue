<template>
<div>
	<div class="columns" v-show="manga">
		<div class="column is-2">
			<figure class="image">
				<img v-bind:src="manga.cover" />
			</figure>
		</div>
		<div class="column is-8">
			<h1 class="title is-1">{{ manga.name }}</h1>
			<p class="subtitle">by
			<template v-for="author in manga.author">
			 {{ nameify(author) }}
			</template>
			| year: {{ manga.yearOfRelease }} | {{ manga.status }}</p>
			<p v-html="manga.info"></p>
			<br>
			<aside class="menu">
			  <p class="menu-label">
			    Chapters
			  </p>
			  <ul class="menu-list" style="overflow-y: scroll; max-height: 28rem;">
			    <li v-for="chapter in manga.chapters">
			    	<router-link :to="{name: 'reader', params: { mangaId: manga.href, chapterId: chapter.chapterId, page: 1 }}">Chapter {{ chapter.chapterId }}: {{ chapter.name }}</router-link>
			    </li>
			  </ul>
			</aside>
		</div>
	</div>
</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
	watch: {
		'$route' (to, from) {
			if ( to !== from ) {
				this.$store.commit('resetManga', [])
			}

			this.$store.dispatch('LOAD_MANGA_INFO')
		}
	},
	mounted() {
		this.$store.dispatch('LOAD_MANGA_INFO')
	},
	computed: {
		...mapState({
			manga: state => state.manga.info
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
	}
}
</script>
