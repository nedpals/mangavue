<template>
<div>
	<div class="columns">
		<div class="column is-8 is-offset-2">
			<nav class="pagination is-centered">
				<router-link class="pagination-next" :to="{name: 'reader', params: { mangaId: params.mangaId, chapterId: params.chapterId, page: nextPage }}">Next</router-link>
				<div class="pagination-list" v-show="currentChapter">Chapter {{ params.chapterId }} / <template v-if="currentChapter.name">{{ currentChapter.name }} /</template> Page {{ params.page }} of {{ currentChapter.pages.length }}</div>
				<router-link class="pagination-previous" :to="{name: 'reader', params: { mangaId: params.mangaId, chapterId: params.chapterId, page: prevPage }}">Previous</router-link>
			</nav>
		</div>
	</div>
	<div class="columns" v-show="currentChapter">
		<div class="column is-two-thirds is-offset-2">
			<figure class="image">
				<img v-bind:src="currentPage.url" />
			</figure>
		</div>
	</div>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
	mounted() {
		this.$store.dispatch('LOAD_MANGA_CHAPTER')
	},
	/**watch: {
		'$route' (to, from) {
			this.$store.dispatch('LOAD_MANGA_CHAPTER')
		}
	},**/
	computed: {
		currentPage() {
			const pageId = this.$store.state.route.params.page
			return this.$store.state.manga.chapter.pages.find(page => page.pageId === parseInt(pageId))
		},
		...mapState({
			currentChapter: state => state.manga.chapter,
			params: state => state.route.params
		}),
		nextPage() {
			if ( this.params.page < this.currentChapter.pages.length ) {
				return parseInt(this.params.page) + 1
			}

			if ( this.params.page === this.currentChapter.pages.length ) {
				return 1
			}
		},
		prevPage() {
			if (parseInt(this.params.page) > 1) {
				return parseInt(this.params.page) - 1
			} else {
				return this.params.page
			}
		}
	}
}
</script>
