<template>
<form method="POST" v-on:submit="onSubmitForm">
	<div class="field has-addons">
		<p class="control has-icons-right">
			<input type="text" :value="value" @input="updateValue" class="input is-medium" placeholder="Search here">
		</p>
		<p class="control">
			<button v:bind-class="{ 'is-loading':isLoading }" class="button is-primary is-medium" style="padding-left:2rem;padding-right:2rem;">
				<span class="icon">
					<i class="fa fa-search"></i>
				</span>
			</button>
		</p>
	</div>
</form>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		props: ['value', 'isLoading'],
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
	width: 120%;
}

@media screen and (max-width: 768px) {
	.control input[type="text"].is-medium {
		width: 100%;
	}
}
</style>
