<template>
<form method="POST" v-on:submit="onSubmitForm">
	<div class="field">
		<p class="control">
			<input type="text" :value="value" @input="updateValue" class="input is-fullwidth is-large" placeholder="Search here">
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