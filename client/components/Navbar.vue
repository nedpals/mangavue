<template>
	<nav class="nav has-shadow" style="position:fixed;top:0;left:0;right:0;">
		<div class="nav-left">
			<router-link :to="{ name: 'home' }" class="nav-item">
				MANGAVUE
			</router-link>
		</div>

		<label class="nav-toggle" for="search-toggle-state">
				<i class="fa fa-search" style="margin-top:13px"></i>
		</label>

		<input type="checkbox" id="search-toggle-state" />

		<label class="nav-toggle" for="nav-toggle-state">
			<span></span>
			<span></span>
			<span></span>
		</label>

		<input type="checkbox" id="nav-toggle-state" />

	    <div class="nav-center search-box" v-if="this.$route.name !== 'home'">
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

.search-box {
	display: flex;
}


#nav-toggle-state,
#search-toggle-state {
  display: none;
}

#nav-toggle-state:checked ~ .nav-menu,
#search-toggle-state:checked ~ .search-box {
  display: block;
}

@media screen and (max-width: 768px) {
	.nav-center.search-box {
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
	computed: {
		...mapState({
			searchQuery: state => state.search.query,
			sQuery: state => state.route.query.q,
			loading: state => state.globals.isLoading
		})
	}
}
</script>
