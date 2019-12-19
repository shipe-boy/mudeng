<template>
	<div class="details-w">
	<div class="details">
		<div class="b-crumbs">
			<crumbs></crumbs>
		</div>
		<div class="wrap">
			<div class="left" v-if="!dataList">
				<p>抱歉，未找到该新闻！</p>
			</div>
			<div class="left" v-if="dataList">
				<p class="l-title">{{dataList.Name}}</p>
				<p class="l-desc">
					<span class="time" v-if="dataList.PubDate">发布日期：{{dataList.PubDate.slice(0,10)}}</span>
					<span class="read">浏览量：{{readNum}}</span>
				</p>
				<div class="content" v-html="dataList.Content">

				</div>
				<!-- <img class="l-pic" :src="dataList.ImagePath" :alt="dataList.Name">
				<p class="l-content">{{dataList.Content}}</p> -->
				<div class="share"> <span>分享到：</span>
					<!-- <div style="float: right; width:100px;height:100%"> -->
						<vshare :vshareConfig="vshareConfig" ref= 'share'></vshare>
					<!-- </div> -->
				</div>
			</div>
			<div class="right">
				<p class="title">最新新闻</p>
				<ul class="list">
					<li class="r-item" v-for="(item, index) in rightList" :key="index">
						<router-link target="_blank" :to="'/news/details/' + item.ID">
							<div class="pic-wrap">
								<img :src="item.ImagePath" :alt="item.Name" style="max-width: 290px;max-height: 195px;">
							</div>
							
							<div class="r-content">
								<p class="r-title el1">{{item.Name}}</p>
								<p class="time">{{item.PubDate.slice(0,10)}}</p>
								<p class="content el2">{{repalceHtml(item.Content)}}</p>
								<p class="r-more" ><span>查看更多</span></p>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>

	</div>
	</div>
</template>

<script>
	import Crumbs from '../components/Crumbs'
	export default {
		data() {
			return {
				vshareConfig: {
					shareList: ['weixin', 'tsina', 'sqq', 'qzone', 'more']
				},
				dataList: {},
				rightList: [], //右侧列表
				readNum: 0 //阅读数量
			}
		},
		components: {
			Crumbs
		},
		computed:{
			path(){
				return this.$route.path
			}
		},
		methods: {
			getReadNum() {
				let id = this.$route.params.id
				// console.log(id)
				let data = {
					Data: (-id),
				};
				// console.log(data)
				this.$.post("/api/MDEx/NewsCount", data)
					.then(res => {
						// console.log(res)
						this.readNum = JSON.parse(res.data)
					})
					.catch(err => {
						console.log(err);
					});
			},
			getDetails() {
				let id = this.$route.params.id
				// console.log(id)
				let data = {
					Action: "SearchID",
					// FieldNames: ["Name", "ID", "PubDate"],
					Resource: "News",
					DataJSONString: JSON.stringify({
						"ID": id
					})
				};
				// console.log(data)
				this.$.post("/api/Table/TableAction", data)
					.then(res => {
						// console.log(JSON.parse(res.data))
						this.dataList = JSON.parse(res.data)[0]
						// console.log(this.dataList)
						this.changeTitle()
						
					})
					.catch(err => {
						console.log(err);
					});
			},
			getNewData() { //右侧最新新闻
				let data = {
					Action: "SearchBlurEnabled",
					// FieldNames: ["Name", "ID", "PubDate"],
					Resource: "News",
					PageControl: {
						PageSize: 3,
						PageIndex: 1,
						OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
					}
				};
				//   console.log(data)
				this.$.post("/api/Table/TableAction", data)
					.then(res => {
						// console.log(JSON.parse(res.data).Rows)
						this.rightList = JSON.parse(res.data).Rows
					})
					.catch(err => {
						console.log(err);
					});
			},
			// more(item) {
			// 	this.$router.push({
			// 		path: '/news/details/' + item.ID
			// 	})
			// 	this.getDetails()
			// 	this.getNewData()
			// },
			changeTitle() {
				// console.log(this.dataList)
				document.title = `${this.dataList.Name}-${this.dataList.NewsClassName}-新闻中心-慕登科技`
			},
			repalceHtml(str){     //去标签
				// console.log(str)
				if(!str) return
				var dd=str.replace(/<\/?.+?>/g,"");
				var dds=dd.replace(/ /g,"");//dds为得到后的内容
				var html = dds.replace(/&nbsp;/g, '')
				return html;
			}
		},
		mounted() {
			this.getDetails() //新闻详情
			this.getNewData() //右侧新闻
			this.getReadNum() //阅读量
			
		}
	}
</script>
<style scoped>
	.wrap {
		display: flex;
		justify-content: space-between;
		/* align-items: center; */
		padding-top: 45px;
	}

	.left {
		width: 1010px;
		text-align: center;
	}

	.left .l-title {
		font-size: 20px;
		font-size: 600;
	}

	.left .l-desc {
		margin: 25px 0 35px 0;
		color: #999;
		font-size: 14px;
	}

	/deep/.content img {
		display: block;
		margin: 0 auto;
		width: 100%;
		max-width: 800px;
		/* height: 550px; */
	}

	/* .left .l-content {
		margin-top: 45px;
		color: #333;
		text-align: left;
		line-height: 2;
		text-indent: 2em;
	} */

	.left .share {
		color: #333;
		text-align: right;
	}

	.share span {
		vertical-align: middle;
	}


	.right {
		width: 290px;
	}

	.right .title {
		font-weight: 600;
	}

	.list .r-item {
		width: 290px;
		height: 375px;
		margin: 10px auto;
		cursor: pointer;
	}
	.list .r-item a{
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}

	.r-item:hover {
		box-shadow: 1px 3px 5px rgba(0, 0, 0, .5)
	}
	.r-item .pic-wrap{
		width: 100%;
		height: 195px;
		display: flex;
		align-content: center;
		justify-content: center;
	}
	.r-item img {
		display: block;
		max-height: 195px;
		max-width: 290px;
	}

	.r-item .r-content {
		box-sizing: border-box;
		height: 180px;
		padding: 20px 20px 0;
		background: #fff;
	}

	.r-content .r-title {
		padding: 5px 0;
		font-size: 15px;
		color: #000;
	}
	.r-content .time{
		font-size: 12px;
		color: #999;
		margin: 10px 0;
	}
	.r-content .content{
		overflow: hidden;
		font-size: 12px;
		height: 48px;
		color: #333;
		line-height: 2;
	}
	.r-content .r-more{
		text-align: right;
		font-size: 13px;
		color: #007ad4;
	}
	
	.bdshare-button-style0-24{
		display: inline-block;
		vertical-align: middle;
	}
	@media screen and (max-width:1024px) {
		.right {
			display: none;
		}
	}

	@media screen and (max-width:700px) {
		.left .share {
			margin-top: 13px;
			font-size: 14px;
		}
	}
</style>
