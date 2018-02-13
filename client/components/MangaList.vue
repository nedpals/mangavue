<template>
<div class="columns is-block-tablet is-multiline" style="padding:1.5rem">
  <div class="column is-12" :key="item.mangaId" v-for="item in items">
    <div class="columns is-mobile">
      <div class="column is-5-mobile is-2-tablet">
        <figure class="image">
          <img v-bind:src="item.cover" />
        </figure>
      </div>
      <div class="column is-7-mobile is-6-tablet">
        <p class="title is-5 is-hidden-tablet"><router-link :to="{name: 'manga', params: { mangaId: item.mangaId }}"> {{ item.name }} </router-link></p>
        <div class="is-hidden-mobile">
          <p class="title is-5-mobile is-3"><router-link :to="{name: 'manga', params: { mangaId: item.mangaId }}"> {{ item.name }} </router-link></p>
          <p v-if="item.info" v-html="item.info"></p>
        </div>
        <ul class="tags">
          <li :key="g" v-for="g in item.genres"><router-link :to="{name: 'genre', params: { genreName: g }}"><span class="tag is-info">{{ g }}</span></router-link></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['items'],
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

<style>
.tags {
	list-style-type: none;
	margin-top: 8px;
}
.tags li {
	display: inline;
	margin-right: 5px;
}
</style>
