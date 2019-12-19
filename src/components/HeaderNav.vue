<template>
	<!-- @click.stop="searchClick(false)" -->
	<div class="header">
		<div class="logo" @click="toIndex">
			<a href="/">
				<img src="../../static/images/logo.png" width="100%" height="100%" />
			</a>
		</div>
		<div class="right">
			<div v-show="!isSearch" class="nav clearfix">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
					<el-menu-item :index="index + 1 + ''" v-for="(item, index) in navList" :key="index">
						<router-link :to="item.path">{{item.name}}</router-link>
						<div :class="['menu-down', {'active': item.active}]">
							<div class="ss">
								<router-link v-for="(item1,index1) in item.list" :key="index1" :to=" item1.path ? item1.path: item.path+'/' + item1.ID">{{item1.Name}}</router-link>
							</div>
						</div>
					</el-menu-item>
				</el-menu>
			</div>
			<div class="search-wrap clearfix" :class="{isSearch: isSearch}">
				<div v-show="!isSearch" class="icon" @click.stop="searchClick(true)"></div>
				<!-- 点击搜索 -->
				<div v-show="isSearch" class="search">
					<i class="search-icon" @click.stop="search"></i>
					<input @click.stop="searchClick(true)" class="content" placeholder="搜索你感兴趣内容的关键词" type="text" name="" id=""
					 v-model.trim="query" @keydown.enter="search">
				</div>
				<div @click.stop="searchClick(false)" v-show="isSearch" class="clear"></div>
			</div>

		</div>

		<!-- 移动端 -->
		<a class="phone-menu" @click="close(false, $event)">
			<i></i>
			<i></i>
			<i></i>
		</a>
		<transition name="menu">
			<div v-if="isOpen" class="small-nav" @click.prevent.stop="close(true)">
				<div class="nav-wrap">
					<!-- @click.stop="search" -->
					<div class="s-search-wrap" @click.stop="a">
						<!-- 点击搜索 -->
						<div class="search">
							<input class="content" placeholder="搜索你感兴趣内容的关键词" type="text" name="" id="" v-model.trim="query" @keydown.enter="search">
							<i class="search-icon" @click.stop="search"></i>
						</div>
					</div>
					<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :default-openeds="openMenu">
						<el-submenu :index="index + 1 + ''" v-for="(item, index) in navList" :key="index">
							<!-- <router-link :to="item.path">{{item.name}}</router-link> -->
							<span slot="title">
								<router-link :to="item.path">{{item.name}}</router-link>
							</span>
							<el-menu-item-group v-if="item.list">
								<el-menu-item v-for="(item1, index1) in item.list" :key="index1">
									<router-link :to=" item1.path ? item1.path: item.path+'/' + item1.ID">{{item1.Name}}</router-link>
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</div>
			</div>
		</transition>
		<div v-if="isOpen" class="cover"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navList: [{
						name: '首页',
						path: '/',
						active: false
					},
					{
						name: '关于我们',
						path: '/about',
						active: true,
						list: []
					},
					{
						name: '核心业务',
						path: '/coreWork',
						active: true,
						list: []
					},
					{
						name: '案例中心',
						path: '/eg',
						active: true,
						list: []
					},
					{
						name: '新闻中心',
						path: '/news',
						active: false
					},
					{
						name: '联系我们',
						path: '/call',
						active: false
					}
				],
				// activeIndex: '1',
				isSearch: false,
				query: '',
				isOpen: false
			}
		},
		computed: {
			activeIndex() {
				let path = this.$route.path;
				let index = -1;
				for (let i = 0; i < this.navList.length; i++) {
					if (i === 0) {
						if (path === this.navList[i].path) {
							index = i;
							break
						}
					} else {
						if (path.indexOf(this.navList[i].path) > -1) {
							index = i
							break
						}
					}

				}
				return index + 1 + ''
			},
			openMenu() {
				let arr = []
				this.navList.forEach((item, index) => {
					if (item.list) {
						arr.push(index + 1 + '')
					}
				})
				return arr
			}
		},
		methods: {
			toIndex() {
				this.$router.push('/')
			},
			searchClick(bool) {
				// console.log(bool)
				this.isSearch = bool
			},
			search() {
				if (!this.query) return
				this.isOpen = false
				this.$router.push({
					path: '/search',
					query: {
						query: this.query,
						type: 1
					}
				})
			},
			close(bool, e) {
				this.isOpen = !bool
			},
			getType(index, table, condition) {
				let data = {
					Action: "SearchBlurEnabled",
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
				// console.log(data)
				this.$.post("/api/Table/TableAction", data)
					.then(res => {
						this.navList[index].list = JSON.parse(res.data).Rows.sort((a, b) => {
							return a.ID - b.ID
						})
						// console.log(this.navList[index].list)
						return
					}).then(() => {
						// this.navList[2].list
						let obj = {
							ID: '4',
							Name: '应用系统综合解决方案',
							path: '/coreWork/solution/1'
						}
						let index = this.navList[2].list.findIndex((item) => {
							return item.Name == '应用系统综合解决方案'
						})
						if (index == -1) {
							this.navList[2].list.push(obj)
						}

					})
					.catch(err => {
						console.log(err);
					});
			},
			a() { //空函数阻止冒泡

			}
		},
		mounted() {
			this.getType(2, 'BusinessClass')
			this.getType(3, 'CaseClass')
			let a = JSON.stringify({
				'CommonInfoType': 1
			})
			this.getType(1, 'CommonInfo', a)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100px;
		font-size: 17px;
	}

	.header .logo {
		display: flex;
		justify-content: center;
		height: 80%;
		width: 240px;
		cursor: pointer;
		margin-left: 5%;
		vertical-align: middle;
	}

	.header .logo a {
		display: flex;
		align-items: center;
	}

	.header .logo a img {
		height: auto;
	}

	.header .right {
		/* overflow: hidden; */
		box-sizing: border-box;
		flex: 1;
		display: flex;
		justify-content: space-between;
		width: 1200px;
		height: 100%;
		padding: 0 5% 0 15%;
	}

	.right .nav {
		/* width: 750px; */
		height: 100%;
	}

	.el-menu.el-menu--horizontal {
		border: none;
		height: 100px;
	}

	.el-menu--horizontal>.el-menu-item {
		/* width: 100px; */
		position: relative;
		height: 100%;
		line-height: 100px;
		margin: 0 22px;
		padding: 0 10px;
		text-align: center;
		color: #333;
		font-size: 17px;
	}

	.el-menu--horizontal>.el-menu-item.is-active {
		position: relative;
		color: rgb(0, 122, 212);
		border-bottom: none;
	}

	.el-menu--horizontal>.el-menu-item>a:before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 0;
		height: 0px;
		background-color: rgb(0, 122, 212);
		transition: all .3s;
	}

	.el-menu--horizontal>.el-menu-item.is-active>a:before {
		left: 0;
		width: 100%;
		height: 3px;
	}

	.el-menu--horizontal>.el-menu-item:hover {
		position: relative;
		color: rgb(0, 122, 212);
	}

	.el-menu--horizontal>.el-menu-item:hover>a:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		transition: all .3s;
	}

	.menu-down {
		position: absolute;
		left: 50%;
		z-index: -33;
		width: 160px;
		transition: all .3s;
		opacity: 0;
		transform: translate(-50%, 10px);
	}

	.menu-down .ss {
		background-color: rgb(243, 243, 243);
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
		position: relative;
		top: 10px;
		font-size: 15px;
	}

	.menu-down a {
		display: block;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #000000;
	}

	.el-menu--horizontal>.el-menu-item:hover .menu-down.active {
		z-index: 999;
		opacity: 1;
		transform: translate(-50%, 0);

	}

	.menu-down a:hover {
		color: rgb(0, 122, 212);
		background-color: rgb(232, 232, 232);
	}

	.search-wrap {
		box-sizing: border-box;
		width: 20%;
		height: 100%;
		padding: 0 20px;
	}

	.search-wrap.isSearch {
		width: 70%;
		margin-right: 15%;

	}

	.search-wrap .icon {
		float: right;
		width: 30px;
		height: 100%;
		margin-right: 40px;
		background: url('../../static/images/search.png') no-repeat center;
		cursor: pointer;
	}

	.search-wrap .search {
		display: inline-block;
		/* position: relative; */
		width: 80%;
		height: 50px;
		line-height: 50px;
		border: 1px solid #eee;
		border-radius: 8px;
		/* margin: 15px 0; */
		vertical-align: middle;
	}

	.search-wrap .search .content {
		box-sizing: border-box;
		width: 84%;
		height: 100%;
		text-indent: 5px;
		border: 0;
		outline: none;
		font-size: 16px;
		vertical-align: top;
	}

	.search-wrap.isSearch .clear {
		position: relative;
		display: inline-block;
		width: 10%;
		height: 100%;
		vertical-align: middle;
		cursor: pointer;
	}

	.search-wrap.isSearch .clear:before {
		content: '';
		position: absolute;
		left: 20%;
		top: 50%;
		height: 3px;
		width: 30%;
		background-color: #bbb;
		transform: rotate(45deg);
	}

	.search-wrap.isSearch .clear:after {
		content: '';
		position: absolute;
		left: 20%;
		top: 50%;
		height: 3px;
		width: 30%;
		background-color: #bbb;
		transform: rotate(-45deg);
	}

	input.content::-moz-placeholder,
	input.content::-webkit-input-placeholder {
		font-size: 12px;
		color: #999;
	}

	.search-wrap.isSearch .search .search-icon {
		display: inline-block;
		width: 10%;
		height: 100%;
		background: url('../../static/images/search.png') no-repeat center;
		cursor: pointer;
		vertical-align: top;
	}

	a {
		display: block;
	}

	a:hover {
		text-decoration: none;
	}

	.phone-menu {
		display: none;
		width: 60px;
		height: 80px;
		position: absolute;
		cursor: pointer;
		right: 20px;
		/* top: 10px */
	}

	.phone-menu i {
		background: #787977;
		display: inline-block;
		width: 60px;
		height: 4px;
		position: absolute;
	}

	.phone-menu i:nth-of-type(1) {
		top: 20px
	}

	.phone-menu i:nth-of-type(2) {
		top: 40px
	}

	.phone-menu i:nth-of-type(3) {
		top: 60px
	}

	.small-nav {
		position: fixed;
		z-index: 12;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.cover {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .4);
	}

	.nav-wrap {
		position: absolute;
		right: 0;
		height: 100%;
		width: 50%;
		padding: 0 20px;
		background-color: #fff;
		overflow-y: scroll;
	}

	.nav-wrap a {
		color: #424242;
	}

	.s-search-wrap {
		position: fixed;
		z-index: 999;
		top: 0;
		padding: 10px 20px;
		height: 60px;
		width: 50%;
		box-sizing: border-box;
		background-color: #fff;
	}

	.s-search-wrap .search {
		position: relative;
		height: 100%;
	}

	.s-search-wrap input {
		box-sizing: border-box;
		padding-left: 50px;
		height: 40px;
		width: 100%;
		border: none;
		border: 1px solid #ddd;
		outline: none;
		border-radius: 10px;
	}

	.s-search-wrap i {
		position: absolute;
		top: 0px;
		left: -5px;
		width: 53px;
		height: 100%;
		background: url('../../static/images/search.png') no-repeat center;
		cursor: pointer;
	}

	.menu-enter-active {
		transition: all .5s;
	}

	.menu-enter {
		transform: translateX(100%);
	}

	.menu-leave-active {
		transition: all .5s;
		transform: translateX(100%);
	}

	@media screen and (max-width:1500px) {
		.el-menu--horizontal>.el-menu-item {
			margin: 0 15px;
		}
		.header .logo {
			height: 65%;
			width: 200px;
		}
	}

	@media screen and (max-width:1380px) {
		.header {
			height: 80px;
		}

		.header .right {
			justify-content: flex-end;
			padding: 0;
		}

		.el-menu.el-menu--horizontal {
			border: none;
			height: 80px;
		}

		.el-menu--horizontal>.el-menu-item {
			margin: 0 15px;
			line-height: 80px;
		}

		.search-wrap {
			width: 15%;
		}

		.search-wrap .search {
			line-height: 80px;
		}

		.search-wrap .search .search-icon {
			top: 35px;
		}
	}

	@media screen and (max-width:1066px) {
		.el-menu--horizontal>.el-menu-item {
			margin: 0 10px;
			line-height: 80px;
		}
	}

	@media screen and (max-width:992px) {

		.nav,
		.right .search-wrap {
			display: none;
		}

		.header .logo {
			height: 60%;
		}

		.phone-menu {
			display: block;
		}

		/* 导航栏样式 */

		.el-submenu__title.is-active>span>a {
			color: rgb(0, 122, 212);
		}

		.router-link-exact-active.router-link-active {
			color: rgb(0, 122, 212);
		}

		.el-menu {
			border: none;
			padding-top: 70px;
		}

		.el-submenu__title>span>a:before {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			width: 0;
			height: 0px;
			background-color: rgb(0, 122, 212);
			transition: all .3s;
		}

		.router-link-exact-active.router-link-active:before {
			left: 0;
			width: 100%;
			height: 3px;
		}

		.el-submenu__title:hover {
			position: relative;
			background-color: #fff;
		}

		.el-submenu__title:hover>span a {
			color: rgb(0, 122, 212);
		}

		.el-submenu__title:hover>span>a:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 3px;
			transition: all .3s;
		}

		.el-submenu .el-menu-item {
			border-bottom: 1px solid #d0d0d0;
		}

		.el-submenu .el-menu-item:hover {
			color: rgb(0, 122, 212);
		}

		/* 滚动条 */
		.nav-wrap::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 4px;
			/*高宽分别对应横竖滚动条的尺寸*/
			height: 4px;
			scrollbar-arrow-color: red;

		}

		.nav-wrap::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 5px;
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			background: rgba(0, 0, 0, 0.2);
			scrollbar-arrow-color: red;
		}

		.nav-wrap::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 0;
			background: rgba(0, 0, 0, 0.1);
		}
	}



	@media screen and (max-width:767px) {
		.header {
			height: 60px;
		}

		.header .logo {
			height: 40px;
			width: 150px;
			padding: 0;
		}

		.nav-wrap {
			width: 60%;
		}

		.phone-menu {
			height: 40px;
		}

		.phone-menu i {
			width: 40px;
		}

		.phone-menu i:nth-of-type(1) {
			top: 5px
		}

		.phone-menu i:nth-of-type(2) {
			top: 20px
		}

		.phone-menu i:nth-of-type(3) {
			top: 35px
		}

		.s-search-wrap {
			width: 60%;
			padding: 10px 0;
		}

		.s-search-wrap input {
			/* width: 80%; */
			padding-left: 30px;
			font-size: 14px;
		}

		.s-search-wrap i {
			width: 40px;
		}

		/* 滚动条 */
		.nav-wrap::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 4px;
			/*高宽分别对应横竖滚动条的尺寸*/
			height: 4px;
			scrollbar-arrow-color: red;

		}

		.nav-wrap::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 5px;
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			background: rgba(0, 0, 0, 0.2);
			scrollbar-arrow-color: red;
		}

		.nav-wrap::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 0;
			background: rgba(0, 0, 0, 0.1);
		}
	}
</style>
