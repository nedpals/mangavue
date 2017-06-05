<template>
	<nav class="nav has-shadow">
		<div class="nav-left">
			<router-link :to="{ name: 'home' }" class="nav-item">
				MANGAVUE
			</router-link>
		</div>
	    <span class="nav-toggle">
	      <span></span>
	      <span></span>
	      <span></span>
	    </span>
	    <div class="nav-center" v-if="this.$route.name !== 'home'">
	    	<div class="nav-item">
		    	<template v-if="this.$route.name == 'search'">
		      		<search-box v-bind:value="sQuery"></search-box>
		      	</template>
		      	<template v-else>
		      		<search-box v-bind:isLoading="loading" v-bind:value="searchQuery"></search-box>
		      	</template>
	      	</div>
	    </div>
	    <div class="nav-right nav-menu">
	      <a href="https://vuejs.org" class="nav-item is-tab">
	        Vue.js
	      </a>
	      <div class="nav-item">
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
	</nav>
</template>

<style>
nav > .wrapper.container {
	margin-bottom: 20px !important;
}
</style>

<script>
import SearchBox from 'components/SearchBox'
import { mapState } from 'vuex'

export default {
	components: {
		SearchBox
	},
	computed: {
		...mapState({
			searchQuery: state => state.search.query,
			sQuery: state => state.route.query.q,
			loading: state => state.globals.isLoading
		})
	}
}
</script>
