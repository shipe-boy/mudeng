<!-- 分页 -->
<template>
	<div class="pages" v-if="total > pageSize">
		<el-pagination background layout="slot" :total="total" :page-size="pageSize">
			<div class="slot prev" :class="{'disalbe' : currentPage == 1}" @click="jumpPage(-1)">
				<上一页
			</div> 
		</el-pagination> 
		<el-pagination background layout="pager, slot" :pager-count="pagerCount" :total="total" :page-size="pageSize" :current-page="currentPage" @current-change="clickPage">
			<div class="slot next" :class="{'disalbe' : currentPage == Math.ceil(total/pageSize)}" @click="jumpPage(1)" >下一页>
			</div>
		</el-pagination>
	</div>
</template>

<script>
	export default {
		props: {
			total: {
				type: Number,
				default: 1
			},
			pageSize: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {}
		},
		computed: {
			currentPage() {
				let page = this.$route.query.page
				return page ? parseInt(page) : 1
			},
			pagerCount(){
				let width = window.innerWidth;
				// console.log(width)
				if(width <= 767){
					return 5
				}
				return 9
			}
		},
		methods: {
			jumpPage(val) {
				switch (val) {
					case -1: //上一页
						if(this.currentPage != 1){
							this.clickPage(this.currentPage - 1)
						}
						break;
					case 1: //下一页
						if(this.currentPage != Math.ceil(this.total/this.pageSize)){
							this.clickPage(this.currentPage + 1)
						}
						break;
				}
			},
			clickPage(i) {
				if (i == this.currentPage) return
				let queryObj = {}
				for (let k in this.$route.query) {
					queryObj[k] = this.$route.query[k]
				}
				// console.log(queryObj)
				queryObj.page = i
				// console.log(queryObj)
				this.$router.push({
					path: this.$route.path,
					query: queryObj
				})
			}
		}
	}
</script>
<style scoped>
	.pages {
		text-align: center;
	}

	.slot {
		vertical-align: top;
		margin: 0;
		display: inline-block;
		padding: 0 4px;
		font-size: 14px;
		font-weight: 400;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		text-align: center;
		cursor: pointer;
	}

	.slot:hover {
		/* background: #298254; */
		color: rgb(0, 122, 212);
	}

	.next {
		margin-left: 13px;
	}

	.slot.disalbe {
		color: #bbb;
	}

	@media screen and (max-width:767px) {
		.pages {
			margin-top: 20px;
		}
	}
</style>
