<template>
<div>
	<div class="columns" v-on:keyup.left="prevPageLink" v-on:keyup.right="nextPageLink" tabindex="-1">
		<div class="column is-12-mobile is-6-tablet is-offset-3-tablet" style="position: fixed; bottom: 10px; z-index: 99; left: -4px;">
			<div class="card">
			  <div class="card-content">
					<nav class="is-hidden-tablet pagination is-centered">
						<a @click="prevPageLink" class="pagination-previous"><<</a>
						<div class="pagination-list" v-if="currentChapter && currentChapter.pages.length">
							Ch. {{ params.chapterId }} /
							{{ params.page }}
							of {{ totalPage }}
						</div>
						<a @click="nextPageLink" class="pagination-next">>></a>
					</nav>
					<nav class="is-hidden-mobile pagination is-centered">
						<a @click="nextPageLink" class="pagination-next">Next</a>
						<div class="pagination-list" v-if="currentChapter && currentChapter.pages.length">
							Chapter {{ params.chapterId }} /
							Page {{ params.page }}
							of {{ totalPage }}
						</div>
						<a @click="prevPageLink" class="pagination-previous">Previous</a>
					</nav>
			  </div>
			</div>
		</div>
	</div>
	<div class="columns" v-if="currentChapter">
		<div class="column is-two-thirds is-offset-2">
			<figure class="image" style="border:1px solid #000;">
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
	watch: {
		'$route' (to, from) {
			if (to.params.chapterId !== from.params.chapterId && to.params.mangaId !== from.params.mangaId) {
				this.$store.commit('resetReader', [])
			}
			this.$store.dispatch('LOAD_MANGA_CHAPTER')
		}
	},
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
		},
		totalPage() {
			if (this.currentChapter !== []) {
				return this.currentChapter.pages.length
			} else {
				return 1
			}
		}
	},
	methods: {
		nextPageLink() {
			this.$router.push({name: 'reader', params: { mangaId: this.params.mangaId, chapterId: this.params.chapterId, page: this.nextPage }})
		},
		prevPageLink() {
			this.$router.push({name: 'reader', params: { mangaId: this.params.mangaId, chapterId: this.params.chapterId, page: this.prevPage }})
		}
	}
}
</script>
