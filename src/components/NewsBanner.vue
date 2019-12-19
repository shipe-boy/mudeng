<!-- 新闻中心banner -->
<template>
	<div class="news-banner">
		<div class="banner">
			<swiper :options="swiperOption1" ref="mySwiper1" v-if="dataList.length > 0">
				<!-- slides -->
				<swiper-slide v-for="(item, index) in dataList" :key="index">
					<div class="pic" :style="{'background-image': 'url('+item.ImagePath+')'}"></div>
					<!-- <img :src="item.ImagePath" :alt="item.Name" style="max-width: 950px; max-height: 550px;"> -->
				</swiper-slide>
			</swiper>
			<ul class="pagination">
				
			</ul>
		</div>
		<div class="content" v-if="dataList.length > 0">
			<p class="title el1">{{dataList[activeIndex].Name}}</p>
			<p class="time">
				<!-- <span class="type" v-if="dataList[activeIndex].NewsClassName">{{dataList[activeIndex].NewsClassName}}</span> -->
				<span class="t-time" v-if="dataList[activeIndex].PubDate">{{dataList[activeIndex].PubDate.slice(0, 10)}}</span>
			</p>
			<p class="desc" >{{repalceHtml(dataList[activeIndex].Description)}}</p>
			<p class="more-wrap"><a :href="dataList[activeIndex].URLLink" target="_blank"><span class="more">查看更多</span></a></p>
		</div>
	</div>
</template>

<script>
	import 'swiper/dist/css/swiper.css'
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'

	export default {
		data() {
			return {
				swiperOption1: {
					loop: true,
					// autoplay: {
					//   delay: 5000,
					//   disableOnInteraction: false
					// },
					pagination: {
						el: ".pagination",
						clickable: true
					},
					observer: true, //修改swiper自己或子元素时，自动初始化swiper 
					observeParents: false, //修改swiper的父元素时，自动初始化swiper 
					onSlideChangeEnd: function(swiper) {
						swiper.update();
						swiper.startAutoplay();
						swiper.reLoop();
					}
				},
				activeIndex: 0,
				dataList: [],
				swiper: null
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		computed: {
			//   swiper(){
			// // console.log()
			//     return this.$refs.mySwiper1.swiper
			//   }
		},
		methods: {
			handleClick(index) {
				// console.log(this.swiper)
				this.activeIndex = index
				// this.swiper
				this.swiper.slideTo(this.activeIndex, 1000, true)
			},
			changeSlider() {
				let self = this
				this.swiper.on("slideChangeTransitionStart", function() {
					// alert(this.activeIndex);
					self.activeIndex = this.realIndex
				})
			},
			getBanner() {
				let id = this.$route.params.id;
				let data = {
					Action: "SearchBlurEnabled",
					Resource: 'ADLink',
					DataJSONString: JSON.stringify({
						'ADArea': '5'
					}),
					PageControl: {
						PageSize: 0,
						PageIndex: 1,
						OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
					}
				}
				// console.log(data)
				this.$.post("/api/Table/TableAction", data)
					.then((res) => {
						// console.log(JSON.parse(res.data))
						this.dataList = JSON.parse(res.data).Rows
						// console.log(this.dataList)
						return
					}).then(() => {
						this.$nextTick(() => {
							this.swiper = this.$refs.mySwiper1.swiper
							this.changeSlider()
						})

					})
					.catch((err) => {
						console.log(err)
					})
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
			// this.changeSlider()
			this.getBanner()
		}
	}
</script>
<style scoped>
	.news-banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		height: 550px;
		box-shadow: 0 4px 10px rgba(0,0,0,.1)
	}

	.banner {
		position: relative;
		width: 50%;
		height: 100%;
	}

	.swiper-container {
		height: 100%;
	}
	.pic{
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.pagination {
		position: absolute;
		bottom: 60px;
		left: 120%;
		display: flex;
	}

	.content {
		box-sizing: border-box;
		width: 50%;
		height: 100%;
		padding: 120px 0 0 40px;
		background-color: rgb(240, 242, 245);
	}

	.content p {
		/* width: 580px; */
		margin: auto;
	}

	.content .title {
		/* height: 40px; */
		font-weight: bold;
		color: #000000;
		font-size: 30px;
	}

	.content .time {
		height: 22px;
		margin: 20px auto;
		font-size: 14px;
	}

	.content .time .type {
		padding: 1px 8px;
		border-radius: 8px;
		border: 1px solid rgb(0, 122, 212);
		background-color: rgba(0, 122, 212, .2);
	}

	.content .time .t-time {
		margin-left: 20px;
		color: #676565;
		font-size: 17px;
	}

	.content .desc {
		height: 84px;
		font-size: 16px;
		line-height: 1.75;
		margin-top: 35px;
		margin-bottom: 55px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		color: #1b1b1b;
	}

	.content .more {
		display: inline-block;
		width: 100px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		background-color: rgb(0, 122, 212);
		border-radius: 15px;
		font-size: 14px;
		color: #fff;
		cursor: pointer;
	}
	.swiper-slide.swiper-slide-active{
		display: flex;
		align-content: center;
		justify-content: center;
	}
	@media screen and (max-width:1380px) {
		.news-banner{
			height: 410px;
		}
		.content {;
			padding: 80px 0 0 40px;
		}
		.pagination{
			bottom: 90px;
		}
	}
	@media screen and (max-width:1200px) {
		.news-banner{
			height: 270px;
		}
		.banner {
			width: 40%;
		}
		.content {
			width: 60%;
			padding: 23px 0 0 40px;
		}
		.content .title {
			/* height: 33px; */
			font-size: 22px;
			line-height: 1.5;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.content .time{
			margin: 10px 0 15px;
		}
		.content .desc{
			height: 60px;
			margin: 0 0 30px 0;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	@media screen and (max-width:767px) {
		.news-banner {
			flex-direction: column;
			height: auto;
		}

		.pagination {
			display: none !important;
		}

		.news-banner .content {
			padding: 20px;
		}

		.news-banner>div {
			width: 100%;
		}
		.news-banner .banner{
			height: 270px;
		}
		.content .title {
			font-size: 22px;
		}

		.content .desc {
			margin-bottom: 10px;
		}

		.more-wrap {
			/* text-align: left; */
		}
	}
</style>
