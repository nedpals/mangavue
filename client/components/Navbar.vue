<template>
	<nav class="navbar is-fixed-top" :class="{ 'is-transparent transparent-bg': isHome }">
		<div class="navbar-brand">
			<router-link v-if="this.$route.name !== 'home'" :to="{ name: 'home' }" class="navbar-item">
				<img src="../../static/mascot.png"/>
        <span class="is-hidden-touch" style="margin-left:1rem;">MANGAVUE</span>
			</router-link>

      <button class="button navbar-burger" @click="showNav = !showNav" :class="{ 'is-active' : showNav }">
        <span></span>
        <span></span>
        <span></span>
      </button>
		</div>
    <div class="navbar-menu" :class="{ 'is-active' : showNav }">
      <div class="navbar-start search-box" v-if="this.$route.name !== 'home'">
        <div class="navbar-item">
          <template v-if="this.$route.name == 'search'">
            <search-box v-bind:value="sQuery"></search-box>
          </template>
          <template v-else>
            <search-box v-bind:isLoading="loading" v-bind:value="searchQuery"></search-box>
          </template>
        </div>
      </div>
      <div class="navbar-end">
        <!-- Place this tag where you want the button to render. -->
        <a class="navbar-item github-button" href="https://github.com/nedpals/mangavue" data-size="large" data-show-count="true" aria-label="Star nedpals/mangavue on GitHub">Star</a>
        <a href="https://vuejs.org" class="navbar-item is-tab">
          Vue.js
        </a>
        <div class="navbar-item">
          <div class="field">
            <p class="control">
              <a class="button" href="https://twitter.com/npned">
                <span class="icon is-small">
                  <i class="fa fa-twitter"></i>
                </span>
                <span>@npned</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
	</nav>
</template>

<style>
.transparent-bg {
  background: transparent;
}

.button.navbar-burger {
  border-radius: inherit;
  border: inherit;
}

.button.navbar-burger:focus,
.button.navbar-burger:hover {
  box-shadow: inherit;
  border: none;
}

.search-box {
	display: flex;
}

@media screen and (max-width: 768px) {
	.navbar-start.search-box {
		background-color: white;
		box-shadow: 0 4px 7px rgba(10, 10, 10, 0.1);
		display: none;
		left: 0;
		display: none;
		right: 0;
		top: 100%;
		position: absolute;
	}
}
</style>

<script>
import SearchBox from 'components/SearchBox'
import { mapState } from 'vuex'

export default {
	components: {
		SearchBox
  },
  watch: {
    '$route': 'insertFixedTag'
  },
  data() {
    return {
      showNav: false
    }
  },
	computed: {
		...mapState({
			searchQuery: state => state.search.query,
			sQuery: state => state.route.query.q,
			loading: state => state.globals.isLoading
		}),
    isHome() {
      return this.$route.name == 'home' ? true : false
    }
	},
  methods: {
    insertFixedTag() {
      if (!this.isHome) {
        const root = document.getElementsByTagName('html')[0]
        root.setAttribute('class', 'has-navbar-fixed-top')
        document.getElementsByTagName('body')[0].setAttribute('class', 'has-navbar-fixed-top')
      }
    }
  }
}
</script>
