<template>
	<div>
		<banner></banner>
		<div class="main">
			<!-- 核心业务 -->
			<div class="session work">
				<div class="title-wrap">
					<p class="title">核心业务</p>
					<p class="desc">专业提供大屏显示综合解决方案</p>
				</div>
				<div class="content">
					<ul class="list">
						<!-- @click="hrefCore(index)" -->
						<li class="item" v-for="(item, index) in coreList" :key="index">
							<router-link :to="'/coreWork/'+ item.ID" target="_blank">
								<div class="item-pic-wrap">
									<img :src="item.ImagePath" :alt="item.Name" style="width: 100%; max-height: 380px;max-width: 450px;">
								</div>
								
								<div class="hidden">
									<p class="h-desc">{{item.Name}}</p>
									<i class="h-icon"></i>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- 新闻中心 -->
			<div class="session news-wrap">
				<div class="news">
					<div class="title-wrap">
						<p class="title">新闻中心</p>
						<p class="desc">幕登科技最新资讯动态及行业发展前瞻</p>
					</div>
					<div class="content">
						<!-- @click="hrefNews('')" -->
						<div class="left">
							<div class="pic-small" :style="{'background-image': 'url('+news1.ImagePath+')'}"></div>
								<img class="pic" :src="news1.ImagePath" :alt="news1.Name" style="max-width: 690px;max-height: 460px;">
								<div class="l-content">
									<p class="l-title el1">{{news1.Name}}</p>
									<p class="l-wrap"><span class="type">{{news1.NewsClassName}}</span><span v-if="news1.PubDate" class="time">{{news1.PubDate.slice(0, 10)}}</span></p>
									<p class="l-desc el2">{{repalceHtml(news1.Content)}}</p>
									<span class="l-more"><router-link target="_blank" :to="'/news/details/' + news1.ID">查看全文 > </router-link></span>
								</div>
						</div>
						<ul class="right">
							<!--  @click="hrefNews(item)" -->
							<li class="r-item" v-for="(item, index) in news" :key="index">
								<!-- <router-link target="_blank" :to="'/news/details/' + item.ID"> -->
								<div class="r-pic-wrap">
									<img class="r-pic" :src="item.ImagePath" :alt="item.Name">
								</div>
								<div class="r-pic-small" :style="{'background-image': 'url('+item.ImagePath+')'}"></div>
									
									<div class="r-content">
										<p class="r-title el1">{{item.Name}}</p>
										<p class="r-time"><span class="r-type">{{item.NewsClassName}}</span><span class="r-t" v-if="item.PubDate">{{item.PubDate.slice(0, 10)}}</span></p>
										<p class="r-desc el2">{{repalceHtml(item.Content)}}</p>
										<span class="l-more small"><router-link target="_blank" :to="'/news/details/' + item.ID">查看全文 > </router-link></span>
									</div>
								<!-- </router-link> -->
							</li>
						</ul>
					</div>
					<div class="more-wrap">
						<span class="more" @click="more('news')">查看更多</span>
					</div>
				</div>
			</div>

			<!-- 案例中心 -->
			<div class="session eg">
				<div class="title-wrap">
					<p class="title">案例中心</p>
					<p class="desc">专业、诚信、铸就幕登科技经典案例</p>
				</div>
				<ul class="eg-list">
					<!-- @click="hrefEg(item)" -->
					<li :class="['eg-item', {'small': index >= 6}]" v-for="(item, index) in egList" :key="index">
						<router-link target="_blank" :to="'/eg/details/' + item.ID + '/1'">
							<!-- <div class="eg-pic" :style="{'background-image': 'url('+item.ImagePath+')'}"></div> -->
							<div class="eg-pic-wrap">
								<img class="eg-pic" :src="item.ImagePath" :alt="item.Name">
							</div>
							<!-- <div class="eg-pic-small" :style="{'background-image': 'url('+item.ImagePath+')'}"></div> -->
							
							<div class="eg-content">
								<p class="eg-title">{{item.Name}}</p>
								<p class="eg-desc" >{{repalceHtml(item.Content)}}</p>
							</div>
						</router-link>
					</li>
				</ul>
				<div class="more-wrap">
					<span class="more" @click="more('eg')">查看更多</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Banner from '../components/Banner'
	export default {
		name: "index",
		data() {
			return {
				coreList: [],
				newsList: [],
				news1: {},
				egList: []
			};
		},
		computed: {
			news() {
				let arr = this.newsList;
				arr.shift()
				return arr
			}
		},
		components: {
			Banner
		},
		methods: {
			//模拟
			getWork(table, size = 0) {
				let data = {
					Action: "SearchAllEnabled",
					Resource: table,
					// DataJSONString: JSON.stringify({ ADArea: "1" }),
					PageControl: {
						PageSize: size,
						PageIndex: 1,
						OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
					}
				}
				// console.log(data)
				this.$.post("/api/Table/TableAction", data)
					.then((res) => {
						// console.log(JSON.parse(res.data))
						if (table === 'BusinessClass') {
							this.coreList = JSON.parse(res.data).Rows
							// console.log(this.coreList)
						}
						if (table === 'News') {
							this.news1 = JSON.parse(res.data).Rows[0]
							this.newsList = JSON.parse(res.data).Rows
							// console.log(this.newsList,this.news1)
						}
						if (table === 'Case') {
							this.egList = JSON.parse(res.data).Rows
							// console.log(this.egList)
						}

					})
					.catch((err) => {
						console.log(err)
					})
			},
			more(msg) {
				if (msg === 'eg') { //  跳转案例中心
					this.$router.push({
						path: '/eg'
					})
				} else { //跳转新闻中心
					this.$router.push({
						path: '/news'
					})
				}
			},
			changeTitle() {
				document.title = '慕登科技'
			},
			repalceHtml(str) { //去标签
				// console.log(str)
				if (!str) return
				var dd = str.replace(/<\/?.+?>/g, "");
				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				var html = dds.replace(/&nbsp;/g, '')
				return html;
			}
		},
		mounted() {
			this.getWork('BusinessClass')
			this.getWork('News', 4)
			this.getWork('Case', 9)
			this.changeTitle()
		}
	};
</script>
<style scoped>
	.main {}

	.session {
		margin-top: 80px;
	}

	.session .title-wrap {
		/* height: 90px; */
		text-align: center;
	}

	.title-wrap .title {
		height: 65px;
		line-height: 65px;
		font-size: 38px;
		font-weight: bold;
	}

	.title-wrap .desc {
		height: 25px;
		margin-bottom: 30px;
		font-size: 18px;
		line-height: 25px;
		color: #4f4f4f;
	}

	/* 核心业务 */
	.work {
		max-width: 1400px;
		margin: 45px auto 30px;
	}

	.work .content .list {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.work .list .item {
		position: relative;
		width: 450px;
		height: 380px;
		cursor: pointer;
	}
	.work .list .item .item-pic-wrap{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.work .item .hidden {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 80px;
		width: 100%;
		font-size: 25px;
		font-weight: bold;
		line-height: 80px;
		background: rgba(255, 255, 255, .8);
		transition: all 1s;
	}

	.work .item:hover .hidden {
		background: rgba(0, 122, 212, .5);
		color: #fff;
	}

	.work .hidden .h-desc {
		font-size: 20px;
		padding-left: 40px;
	}

	.work .hidden .h-icon {
		position: absolute;
		right: 10px;
		top: 0;
		width: 30px;
		height: 100%;
		background-image: url('../../static/images/more.png');
		background-repeat: no-repeat;
		background-position: center;
	}
	.work .item:hover .hidden .h-icon{
		background-image: url(../../static/images/f-more.png);
	}

	/* 新闻中心 */
	.news-wrap.session{
		margin-top: 0;
	}
	.news-wrap {
		background-color: rgb(240, 242, 245);
	}

	.news {
		max-width: 1400px;
		padding-top: 45px;
		margin: auto;
		overflow: hidden;
	}

	.news .desc {
		position: relative;
		display: inline-block;
	}

	/* .news .desc::before,
	.news .desc::after {
		content: '';
		position: absolute;
		top: 50%;
		height: 1px;
		width: 100px;
		background-color: rgb(0, 122, 212);
	}

	.news .desc::before {
		left: -120px;
	}

	.news .desc::after {
		right: -120px;
	} */

	.news .content {
		display: flex;
		align-items: center;
		justify-content: space-between
	}

	.news .content .left {
		/* flex: 1; */
		width: 690px;
		height: 665px;
		background-color: #fff;
	}

	.news .content .left:hover {
		box-shadow: 0 8px 20px #ccc;
	}
    .news .content .left .pic-small,
	.news .content .right .r-pic-small{
		display: none;
		width: 100%;
		height: 220px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
	.news .content .right .r-pic-small{
		height: 185px;
	}
	.news .content .left .pic {
		display: block;
		width: 100%;
		height: 460px;
		/* height: 430px; */
		margin: auto;
	}

	.content .left .l-content {
		position: relative;
		box-sizing: border-box;
		height: 207px;
		padding: 20px;
	}

	.content .left .l-content .l-title {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(-110%);
		height: auto;
		width: 100%;
		padding: 0 10px;
		line-height: 36px;
		font-size: 28px;
		font-weight: bold;
		white-space: pre-wrap;
		color: #fff;
		background-color: rgba(0, 0, 0, .5);
	}
	.content .left .l-wrap{
		font-size: 15px;
		padding-left: 10px;
		margin-bottom: 15px;
	}
	.content .left .l-wrap .type{
		padding: 1px 8px;
		border-radius: 8px;
		color: rgb(0, 122, 212);
		border: 1px solid rgb(0, 122, 212);
		background-color: rgba(0, 122, 212, .2);
	}
	.content .left .l-wrap .time{
		margin-left: 20px;
		color: #676565;
		font-size: 17px;
	}
	.content .left .l-content .l-desc {
		overflow: hidden;
		height: 60px;
		line-height: 30px;
		font-size: 17px;
		margin-bottom: 28px;
	}
	.content .left .l-more a{
		color: rgb(0, 122, 212);
		font-size: 17px;
		
	}
	.news .content .right {
		/* flex: 1; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 690px;
		height: 665px;
	}

	.news .content .right .r-item{
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 185px;
		width: 100%;
		background-color: #fff;
	}
	.right .r-item .r-pic-wrap{
		width: 277px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.right .r-item img {
		max-width: 277px; 
		max-height: 185px;
	}

	.right .r-item .r-content {
		box-sizing: border-box;
		/* flex: 1; */
		/* width: 363px; */
		width: 413px;
		height: 100%;
		padding: 20px 20px 0;

	}

	.r-content .r-title {
		font-size: 20px;
		font-weight: 600;
	}

	.r-content .r-time {
		color: #676565;
		font-size: 14px;
		margin: 10px 0 16px 0;
	}
	.r-content .r-time .r-type{
		font-size: 12px;
		padding: 2px 8px;
		border-radius: 3px;
		color: rgb(0, 122, 212);
		border: 1px solid rgb(0, 122, 212);
		background-color: rgba(0, 122, 212, .2);
	}
	.r-content .r-time .r-t{
		padding-left: 22px;
		font-size: 15px;
		color: #676565;
	}
	.r-content .r-desc {
		height: 44px;
		overflow: hidden;
		line-height: 22px;
		font-size: 13px;
		word-break: break-all;
		word-wrap: break-word;
		margin-bottom: 18px;
	}
	.r-content .l-more.small a{
		float: right;
		margin-right: 8px;
		color: rgb(0, 122, 212);
		font-size: 13px;
	}
	.news .r-item:hover {
		box-shadow: 0 8px 20px #ccc;
	}

	.more-wrap {
		text-align: center;
		color: rgb(0, 122, 212);
	}

	.more {
		display: inline-block;
		width: 200px;
		height: 40px;
		margin: 40px 0;
		border: 1px solid rgb(0, 122, 212);
		border-radius: 20px;
		line-height: 40px;
		cursor: pointer;
		transition: .3s;
	}
	.more:hover{
		box-shadow: 0 6px 20px rgba(0,0,0,0.3);
	}
	/* 案例中心 */
	.eg {
		max-width: 1400px;
		margin: 45px auto 0;
	}

	.eg-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		/* align-items: center; */
		align-content: space-between;
		/* height: 1160px; */
	}

	.eg-list .eg-item {
		overflow: hidden;
		width: 440px;
		height: auto;
		cursor: pointer;
		box-shadow: 1px 1px 4px rgba(0, 0, 0, .4);
		font-size: 0;
		margin-top: 40px;
	}
	.eg-list .eg-item a{
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}
	.eg-item .eg-pic-wrap{
		display: flex;
		height: 295px;
		align-items: center;
		justify-content: center;
	}
	/* .eg-item .eg-pic-small{
		display: none;
		width: 100%;
		height: 295px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	} */
	.eg-item .eg-pic {
		max-width: 440px;
		max-height: 295px;
		/* width: 100%;
		height: 75%; */
	}

	.eg-item .eg-content {
		box-sizing: border-box;
		height: 92px;
		width: 100%;
		padding: 20px;
	}

	.eg-item .eg-content .eg-title {
		height: 30px;
		line-height: 30px;
		font-weight: 600;
		font-size: 16px;
	}

	.eg-item .eg-content .eg-desc {
		height: 22px;
		line-height: 22px;
		font-size: 14px;
	}



 	@media screen and (max-width:1400px) {
		.news{
			width: 1260px;
		}
		.news .content .left{
			width: 49%;
			margin-right: 1%;
		}
		.news .content .right{
			width: 50%;
		}
		.right .r-item .r-pic-wrap{
			width: 35%;
		}
		.right .r-item .r-content {
			width: 65%;
		}
		.work .list .item{
			width: 30%;
		}
		.right .r-item img {
			max-width: 220px; 
		}
		/* .right .r-item .r-content {
			width: 363px;
		} */
		/* .eg-list {
			justify-content: space-around;
		} */

		/* .eg-list .eg-item.small {
			display: none; 
		} */
	}
	@media screen and (max-width: 1380px){
		.eg-list .eg-item{
			width: 31.33333%;
			margin-left: 1%;
			margin-right: 1%;
		}
		.eg-list .eg-item .eg-pic{
			/* width: 300px; */
			/* height: auto; */
			margin: 0 auto;
		}
		.news{
			width: 100%;
		}
		.news .content .left{
			width: 49%;
			height: 581px;
		}
		.news .content .right{
			height: 581px;
		}
		.right .r-item .r-pic-wrap{
			width: 35%;
		}
		.news .content .left .pic {
			height: 374px;
		}
	}
	@media screen and (max-width:1200px) {
		.news{
			width: 100%;
		}
		.eg-list .eg-item{
			width: 32%;
			margin: 2% 0 2% 1%;
		}
		.eg-list .eg-item .eg-pic{
			/* display: block;
			width: 300px; */
			/* height: auto; */
			margin: 0 auto;
			width: 100%;
		}
		.eg-list .eg-item.small {
			display: none;
		}
		.news .content .left{
			width: 44%;
			height: 595px;
		}
		.news .content .right{
			width: 55%;
			height: 595px;
		}
	}

	@media screen and (max-width:992px) {
		.news{
			width: 100%;
		}
		.news .content {
			flex-direction: column;
		}

		.news .content .left {
			width: 100%;
			height: auto;
			margin-bottom: 20px;
		}
		.news .content .left .pic-small,
		.news .content .right .r-pic-small{
			display: block;
		}
		.news .content .right .r-pic-small{
			width: 36%;
		}
		.right .r-item .r-content {
			width: 64%;
		}
		.news .content .left img.pic,
		.right .r-item .r-pic-wrap{
			display: none;
		}
		.content .left .l-content .l-title{
			transform: translateY(-120%);
		}
		.news .content .right {
			width: 100%;
		}
		/* .news .content .right img{
			width: 354.4px;
		} */
		.work .content .list {
			flex-direction: column;
		}

		.work .content .list .item{
			width: 70% ;
			margin-top: 20px ;
		}
		.eg-list .eg-item{
			width: 49% ;
			margin: 2% .5%;
		}
		
	}

	@media screen and (max-width:767px) {
		.news .content .left {
			height: auto;
		}
		.news .content .left .pic-small,
		.news .content .right .r-pic-small{
			display: block;
		}
		.news .content .right .r-pic-small{
			width: 100%;
		}
		.news .content .left img.pic,
		.right .r-item .r-pic-wrap{
			display: none;
		}
		
		.content .left .l-content{
			height: 180px;
		}
		.content .left .l-content .l-title{
			line-height: 1.75;
		    font-size: 16px;
		}
		.content .left .l-content .l-desc{
			height: 50px;
			font-size: 14px;
		    line-height: 1.75;
		}
		.content .left .l-wrap,.content .left .l-wrap{
			font-size: 14px;
		}
		.content .left .l-more a{
			float: right;
			font-size: 14px;
		}
		.news .content .right{
			height: auto;
		}
		.news .content .right .r-item{
			height: auto;
			flex-direction: column;
			margin-top: 15px;
		}
		.news .content .right .r-item>img{
			width: 100%;
			height: 185px;
		}
		.news .content .right .r-item .r-content{
			width: 100%;
		}
		    
		.work .content .list .item,
		.eg-list .eg-item {
			width: 90% !important;
			margin-top: 20px !important;
		}
		
		.work .list .item {
			height: auto;
		}
		
		.right .r-item img {
			width: 40%;
		}
		
		.right .r-item .r-content {
			width: 60%;
		}
		.eg-item .eg-pic-wrap{
			height: auto;
		}
		.eg-list .eg-item .eg-pic{
			max-width: 100%;
			max-height: none;
		}
	}
</style>
