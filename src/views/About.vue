<!--  -->
<template>
	<div>
		<banner-views></banner-views>
		<v-nav></v-nav>

		<router-view></router-view>
	</div>
</template>

<script>
	import BannerViews from '../components/BannerViews'
	import VNav from '../components/Nav' 
	export default {
		name: 'About',
		data() {
			return {
			}
		},
		components: {
			BannerViews,
			VNav
		}
	}
</script>
