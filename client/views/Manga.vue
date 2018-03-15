<template>
<div v-if="manga" style="padding:1rem;">
	<div class="section">
    <div class="container-fluid">
      <div class="columns is-mobile">
        <div class="column is-4-mobile is-2-tablet">
          <figure class="image">
            <img v-bind:src="manga.cover" />
          </figure>
        </div>
        <div class="column is-6">
          <div class="manga-info">
            <h1 class="is-hidden-mobile title is-1">{{ manga.name }}</h1>
            <h1 class="is-hidden-tablet title is-3">{{ manga.name }}</h1>
            <div class="columns">
              <div class="column">
                <span class="title is-5">author</span>
                <br>
                <span class="subtitle is-5">
                  <template v-for="author in manga.author">
                  {{ nameify(author) }}
                  </template>
                </span>
              </div>
              <div class="column">
                <span class="title is-5">released</span>
                <br>
                <span class="subtitle is-5">{{ manga.yearOfRelease }}</span>
              </div>
              <div class="column">
                <span class="title is-5">status</span>
                <br>
                <span class="subtitle is-5">
                  {{ manga.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="columns read-now-section">
            <div class="column is-12">
              <router-link class="button is-primary is-large" :to="{name: 'reader', params: { mangaId: params.mangaId, chapterId: manga.chapters[0].chapterId, page: 1 }}">
                Read now
              </router-link>
            </div>
          </div>
          <div class="manga-info-description">
             <p class="is-hidden-mobile" v-html="manga.info"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
	<div class="columns">
		<div class="column is-6-desktop is-12-touch">
			<p class="is-hidden-tablet" v-html="manga.info"></p>
			<br>
			<aside class="menu">
				<p class="menu-label">
					Chapters
				</p>
				<ul class="menu-list" style="overflow-y: scroll; max-height: 50%;">
					<li :key="chapter.chapterId" v-for="chapter in manga.chapters">
						<router-link :to="{name: 'reader', params: { mangaId: params.mangaId, chapterId: chapter.chapterId, page: 1 }}">
							Chapter {{ chapter.chapterId }}
							<template v-if="chapter.name">:
								{{ chapter.name }}
							</template>
						</router-link>
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
			manga: state => state.manga.info,
			params: state => state.route.params
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
