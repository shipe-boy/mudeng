<!--  -->
<template>
	<div class="view-wrap">
		<div class="views" v-if="dataList">
			<a :href="dataList.URLLink ? dataList.URLLink : '###'" target="_blank">
				<img class="pic" :src="dataList.ImagePath" :alt="dataList.Name" width="100%">
			</a>
		</div>
		<!-- <div class="mask" ref="mask">
			<p class="mask-title el1">{{dataList.Name}}</p>
			<p class="mask-desc el1">{{dataList.Description}}</p>
			<p class="mask-more" v-if="dataList && dataList.URLLink"><a :href="dataList.URLLink" target="_blank"><span class="more">查看详细</span></a></p>
		</div> -->
	</div>

</template>

<script>
	export default {
		data() {
			return {
				dataList: {}
			}
		},
		watch: {
			$router() {
				this.listenRoute()
			}
		},
		methods: {
			listenRoute() {
				// console.log(this.$route.path)
				let path = this.$route.path
				if (path.indexOf('/about') > -1) { //关于我们
					// this.$refs.mask.style = 'display:none;'
					this.getBanner('2')
				} else if (path.indexOf('/coreWork') > -1) { //核心业务
					// this.$refs.mask.className = 'mask m-left'
					this.getBanner('3')
				} else if (path.indexOf('/eg') > -1) { //案例中心
					// this.$refs.mask.className = 'mask m-right'
					this.getBanner('4')
				} else if (path.indexOf('/search') > -1) { //搜索页面
					// this.$refs.mask.className = 'mask m-left'
					this.getBanner('6')
				}
			},
			getBanner(query) {
				let id = this.$route.params.id;
				let data = {
					Action: "SearchBlurEnabled",
					Resource: 'ADLink',
					DataJSONString: JSON.stringify({
						'ADArea': query
					}),
					PageControl: {
						PageSize: 1,
						PageIndex: 1,
						OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
					}
				}
				// console.log(data)
				this.$.post("/api/Table/TableAction", data)
					.then((res) => {
						// console.log(JSON.parse(res.data).Rows)
						this.dataList = JSON.parse(res.data).Rows[0]
						// console.log(this.dataList, JSON.parse(res.data).Rows)
					})
					.catch((err) => {
						console.log(err)
					})
			}
		},
		mounted() {
			this.listenRoute()
		}
	}
</script>
<style scoped>
	.view-wrap{
		position: relative;
	}
	/* .mask{
		position: absolute;
		top: 0;
		height: 100%;
		width: 15%;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.m-left{
		left: 15%
	}
	.m-right{
		right: 15%
	}
	.mask .mask-title{
		font-size: 26px;
		font-weight: 600;
	}
	.mask .mask-desc{
		margin: 5px 0 15px;
	}
	.mask .mask-more a{
		color: #fff;
	}
	.mask .mask-more .more{
		display: inline-block;
		font-size: 14px;
		padding: 4px 15px;
		border: 1px solid #fff;
		border-radius: 20px;
		cursor: pointer;
	} */
	.views {
		/* height: 550px; */
	}

	.views a {
		display: block;
		height: 100%;
		width: 100%;
	}

	.views img {
		display: block;
		margin: auto;
		max-width: 1920px;
		max-height: 550px;
	}
	
	
	@media screen and (max-width:700px) {
		.mask{
			width: 30%;
		}
		.mask-title{
			font-size: 14px;
		}
		.m-left{
			left: 10%;
		}
		.m-right{
			right: 10%
		}
		.mask .mask-more .more{
			font-size: 12px;
			padding: 0px 10px;
		}
	}
</style>
