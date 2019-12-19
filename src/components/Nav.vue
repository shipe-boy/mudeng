<!-- 二级导航 -->
<template>
	<div>
		<!-- <div v-show="isFixed" class="nav">
			<div class="list">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
					<el-menu-item :index="index + 1 + ''" v-for="(item, index) in list" :key="index" v-if="item.Name">
						<router-link :to="{path: path + '/' + item.ID}">{{item.Name}}</router-link>
					</el-menu-item>
					<el-menu-item index="4" v-if="path === '/coreWork'">
						<router-link :to="{path: path + '/solution/1'}">应用系统综合解决方案</router-link>
					</el-menu-item>
				</el-menu>
			</div>
		</div> -->
		<div class="nav" ref='nav'>
			<div v-show="!isFixed" class="list">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
					<el-menu-item :index="index + 1 + ''" v-for="(item, index) in list" :key="index" v-if="item.Name">
						<router-link :to="{path: path + '/' + item.ID}">{{item.Name}}</router-link>
					</el-menu-item>
					<el-menu-item index="4" v-if="path === '/coreWork'">
						<router-link :to="{path: path + '/solution/1'}">应用系统综合解决方案</router-link>
					</el-menu-item>
				</el-menu>
			</div>
		</div>
	</div>

</template>

<script>
	// let self = null;
	// let startTop = 0;
	export default {
		data() {
			return {
				// activeIndex: '1',
				path: '',
				list: [],
				isFixed: false,
				oldpath: ''
			}
		},
		computed: {
			activeIndex() {
				// console.log(this.list[this.$route.params.type - 1].ID)
				let i = this.list.findIndex((item) => {
					return item.ID == this.$route.params.type

				})
				// console.log(i)
				return i + 1 + ''
			}
		},
		watch: {
			$route() {
				this.listenRoute()
			}
		},
		methods: {
			listenRoute() {
				let path = this.$route.path;
				this.path = '/' + path.split('/')[1];
				if(this.oldpath !== path){
					if (path.indexOf('/coreWork') > -1) { //核心业务导航
						this.getType('BusinessClass')
					} else if (path.indexOf('/eg') > -1) { //案例中心导航
						this.getType('CaseClass')
					} else { //关于我们导航
						let a = JSON.stringify({
							'CommonInfoType': 1 
						})
						this.getType('CommonInfo', a)
					}
				}
				
				
				this.oldpath = path
			},
			getType(table, condition) {
				let data = {
					Action: "SearchAllEnabled",
					PageControl: {
						PageSize: 0,
						PageIndex: 1,
						OrderBy: "DisplayIndex DESC, ID DESC"
					}
				};
				data.Resource = table
				if (condition) {
					data.DataJSONString = condition
				}
				this.$.post("/api/Table/TableAction", data)
					.then(res => {
						this.list = JSON.parse(res.data).Rows.sort((a, b) => {
							return a.ID - b.ID
						})
						// console.log(this.arr)
						return
					}).then(() => {
						this.changeTitle()
						// self = this;
						// this.$nextTick(() => {
						// 	startTop = self.$refs.nav.offsetTop;
						// 	window.addEventListener('scroll', this.onScroll)
						// })


					})
					.catch(err => {
						console.log(err);
					});
			},
			changeTitle() {
				let type = this.$route.params.type
				// console.log(this.arr[type - 1].Name)
				let str = ''
				if (this.$route.path.indexOf('/coreWork') > -1) {
					str = '核心业务'
				} else if (this.$route.path.indexOf('/eg') > -1) {
					str = '案例中心'
				} else {
					str = '关于我们'
				}
				let i = this.list.findIndex((item) => {
					return item.ID == type
				})
				let title = this.list[i].Name
				document.title = `${title}-${str}-慕登科技`
			},
			// onScroll(e) {
			// 	console.log(document.documentElement.scrollTop)
			// 	// console.log(startTop,self.$refs.nav.getBoundingClientRect().top)
			// 	let top = document.documentElement.scrollTop;
			// 	if (top > startTop) {
			// 		console.log('吸')

			// 	} else {
			// 		console.log('放')

			// 	}

			// }
		},
		mounted() {
			this.listenRoute()
		},
		// beforeDestroy() {
		// 	window.removeEventListener('scroll', this.onScroll)
		// }
	}
</script>
<style scoped>
	.nav {
		width: 100%;
		height: 65px;
		background-color: #fff;
		box-shadow: 1px 1px 10px rgba(0, 0, 0, .5)
	}

	.nav.fixed {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
	}

	.nav a {
		display: block;
		/* width: 100%; */
		/* height: 100%; */
	}

	.nav a:hover {
		text-decoration: none;
	}

	.list {
		display: flex;
		max-width: 1400px;
		height: 100%;
		margin: 0 auto;
		line-height: 65px;

	}

	.el-menu--horizontal>.el-menu-item {
		height: 65px;
		line-height: 65px;
		padding: 0 10px;
		margin: 0 30px;
		color: #333;
	}

	.el-menu--horizontal>.el-menu-item.is-active {
		color: rgb(0, 122, 212);
		border-bottom: 4px solid rgb(0, 122, 212);
	}

	.el-menu--horizontal>.el-menu-item:hover {
		color: rgb(0, 122, 212);
		border-bottom: 4px solid rgb(0, 122, 212) !important;
	}
	.el-menu--horizontal>.el-menu-item:hover  a{
		color: rgb(0, 122, 212);
	}
	@media screen and (max-width:767px) {
		.el-menu--horizontal>.el-menu-item {
			margin: 0 !important;
		}

		.nav {
			overflow-x: auto;
		}

		.nav .list {
			width: 100%;
			overflow: hidden;
			overflow-x: auto;
			white-space: nowrap;
		}

		.el-menu--horizontal>.el-menu-item {
			display: inline-block;
			float: none;
		}
	}
</style>
