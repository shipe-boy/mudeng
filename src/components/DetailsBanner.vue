<!-- 详情页的banner -->
<template>
    <div class="wrap">
        <div class="pic">
			<!-- <div class="pic-show" v-if="dataList.IntroPicture && dataList.IntroPicture.length > 0" :style="{'background-image': 'url('+dataList.IntroPicture[activeIndex]+')'}"></div> -->
            <img v-if="dataList.IntroPicture && dataList.IntroPicture.length > 0" :src="dataList.IntroPicture[activeIndex]" :alt="dataList.Name">
        </div>
        <div class="content">
            <p class="c-title">{{dataList.Name}}</p>
            <div class="c-desc" v-html="dataList.Content">
            </div>
            <div class="banner" v-if="dataList.Thumbnail && dataList.Thumbnail.length > 0" >
                <swiper :options="swiperOption2" ref="mySwiper2">
                    <swiper-slide :class="{'active': activeIndex === index}" v-for="(item, index) in dataList.Thumbnail" :key="index" @click.native="handleClick(item, index)">
						<!-- <div class="pic-small" :style="{'background-image': 'url('+item+')'}"></div> -->
						<img class="pic-img" :src="item" :alt="item.Name">
                </swiper-slide>
                    
                    <div class="swiper-button-prev swp2" slot="button-prev"></div>
                    <div class="swiper-button-next swp2" slot="button-next"></div>
                </swiper>
            </div>
        </div>
    </div>
  
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
        swiperOption2:{
            slidesPerView: 4,
            spaceBetween: 25,
			slidesPerGroup: 1,
            navigation: {
                nextEl: ".swiper-button-next.swp2",
                prevEl: ".swiper-button-prev.swp2"
            },
            preventClicksPropagation : true
        },
        activeIndex: 0,
        dataList: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
      swiper(){
          return this.$refs.mySwiper2.swiper
      }
  },
  watch: {
      $router(){
          
      }
  },
  methods: {
    handleClick(item, index){
        // console.log(item)
        this.activeIndex = index;
    },
    listenRoute(){  
        if(this.$route.path.indexOf('/coreWork') > -1){ //核心业务
            this.getDetails('Business')
        }else{  //案例中心
            this.getDetails('Case')
        }
    },
    getDetails(table){
      let id = this.$route.params.id;
      let data = {
        Action: "SearchID",
        Resource : table,
        DataJSONString: JSON.stringify({ 'ID': id }),
        PageControl: {
          PageSize: 0,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
        }
      }
      // console.log(data)
      this.$.post("/api/Table/TableAction", data)
            .then((res) => {
				// console.log(JSON.parse(res.data)[0])
				//   IntroPicture 介绍图
				//   Thumbnail  缩略图
				let d = JSON.parse(res.data)[0]
				if(d.IntroPicture && d.Thumbnail ){
					d.IntroPicture = this.getSrc(d.IntroPicture)
					d.Thumbnail = this.getSrc(d.Thumbnail)
				}
				 this.dataList = d
				 // console.log(d)
            })
            .catch((err)=> {
              console.log(err)
            })
    },
	getSrc(str){
		var arr = [];
		while (str.indexOf('src=')>=0) {
			str=str.substring(str.indexOf('src=')+5);
			arr.push(str.substring(0,str.indexOf('" ')));
		}
		return arr
	}
  },
  mounted(){
      this.listenRoute()
  }
}

</script>
<style scoped>
.wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 495px;
    margin-top: 40px;
}
.pic{
	display: flex;
	align-items: center;
	justify-content: center;
    height: 100%;
    width: 730px;
}
.pic-show{
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}
.pic img{
    display: block;
	/* width: 100%; */
    max-width: 730px;
    max-height: 490px;
}

.content{
    box-sizing: border-box;
    width: 670px;
    height: 100%;
    padding: 35px 75px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.c-title{
    font-size: 26px;
}
.c-desc{
    height: 130px;
}
.c-desc .desc{
    margin: 10px 0;
}
.banner{
    /* box-sizing: border-box; */
    padding-top: 20px; 
    height: 70px;
    border-top: 1px solid rgb(240, 242, 245);
}

/* .pic-wrap{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
} */
.pic-img{
	max-height: 70px;
	max-width: 100px;
}
.swiper-container{
    box-sizing: border-box;
    height: 100%;
    padding: 0 22px;

}
.swiper-slide{
	width: 100px !important;
	height: 70px !important;
	/* margin-right: 25px !important; */
    cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
.swiper-slide.active img.pic-img{
	max-height: 64px;
	max-width: 94px;
}
.swiper-button-prev{
    left: -5px;
    background: url('../../static/images/prev.png') no-repeat center;
}
.swiper-button-next{
    right: -5px;
    background: url('../../static/images/next.png') no-repeat center;
}
.active{
    box-sizing: border-box;
    border: 3px solid rgb(20, 132, 215);
}

@media screen and (max-width:1400px) {
	.pic,
	.content{
		width: 50%;
	}
	.pic img{
	    max-width: 100%;
	}
	.swiper-container{
	    padding: 0 25px;
	
	}
}

@media screen and (max-width:1300px) {
	.pic img{
	    max-width: 100%;
	}
}
@media screen and (max-width:1200px) {
	.content{
	    padding: 35px 35px 0;
	}
}
@media screen and (max-width:992px) {
	.wrap{
		height: auto;
		flex-direction: column;
		margin: 0;
	}
	.wrap .pic{
		width: 100%;
	}
	.wrap .content{
		box-sizing: border-box;
		width: 100%;
		padding: 0 20px;
	}
}
	/* @media screen and (max-width:767px) {
		.wrap{
			height: auto;
			flex-direction: column;
			margin: 0;
		}
		.wrap .pic{
			width: 100%;
		}
		.wrap .content{
			box-sizing: border-box;
			width: 100%;
			padding: 0 20px;
		}
	} */
</style>