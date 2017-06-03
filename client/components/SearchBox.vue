<template>
<form method="POST" v-on:submit="onSubmitForm">
	<div class="field has-addons">
		<p class="control">
			<input type="text" :value="value" @input="updateValue" class="input is-medium" placeholder="Search here">
		</p>	
		<p class="control">
			<button class="button is-primary is-medium">Search</button>
		</p>
	</div>
</form>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		props: ['value'],
		methods: {
			updateValue(e) {
				this.$store.commit('updateSearchQuery', e.target.value)
			},
			onSubmitForm(e) {
				e.preventDefault();
				this.$router.push('/search?q='+this.$store.state.search.query)
				this.$store.dispatch('LOAD_SEARCH_RESULTS')
			}
		}
	}
</script>
<style>
.control input[type="text"].is-medium {
	width: 40rem;
}
</style>