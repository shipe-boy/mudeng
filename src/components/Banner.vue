<!--  -->
<template>
  <div class="banner">
    <swiper :options="swiperOption" v-if="bannerList.length > 0">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in bannerList" :key="index">
		  <a style="display: block;height: 100%;" :href="item.URLLink" target="_blank">
			  <img :src="item.ImagePath" :alt="item.Name" style="width: 100%; max-width: 1920px;max-height: 800px;">
		  </a>
        
      </swiper-slide>
      
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data () {
    return {
      swiperOption:{
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:false,//修改swiper的父元素时，自动初始化swiper 
        onSlideChangeEnd: function(swiper){ 
        　　　swiper.update();  
        　　　swiper.startAutoplay();
        　　  swiper.reLoop();  
        }
      },
      bannerList: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods:{
    getData(){
      // http://47.100.163.199:8010/xml/ADArea.xml
      let data = {
        Action: "SearchBlurEnabled",
        Resource : 'ADLink',
        DataJSONString: JSON.stringify({ ADArea: "1" }),
        PageControl: {
          PageSize: 0,
          PageIndex: 1,
          OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
        }
      }
      // console.log(data)
      this.$.post("/api/Table/TableAction", data)
            .then((res) => {
              // console.log(JSON.parse(res.data).Rows)
              this.bannerList = JSON.parse(res.data).Rows
            })
            .catch((err)=> {
              console.log(err)
            })
    }
  },
  mounted(){
    this.getData()
  }
}

</script>
<style scoped>
.banner{
	max-height: 800px;
  /* height: 800px; */
}
.swiper-container{
  height: 100%;
}
.swiper-pagination-bullet{
  width: 20px;
}
</style>