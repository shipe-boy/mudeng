<!-- 核心系统解决方案 -->
<template>
  <div>
      <div class="banner">
          <iframe class="iframe" src="https://720yun.com/t/689jrOuwku7?scene_id=27849521" frameborder="0"></iframe>
      </div>
      <div class="views">
          <div class="nav">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                    <el-menu-item :index="index + 1 + ''" v-for="(item, index) in navList" :key="index"> <router-link :to="path +'/'+ item.id">{{item.Name}}</router-link> </el-menu-item>
                </el-menu>
          </div>
      </div>
	  <div class="content">
		  核心系统解决方案
	  </div>
      
  </div>
</template>

<script>
import BannerViews from '../components/BannerViews'
export default {
  data () {
    return {
        navList: [
            {
                id: 1,
                Name: '方案介绍'
            },
            {
                id: 2,
                Name: '系统拓扑图'
            },
            {
                id: 3,
                Name: '方案应用'
            }
        ],
        path: '',
        // activeIndex: '1'
    }
  },
  components: {
      BannerViews
  },
  computed: {
      activeIndex(){
          return this.$route.params.id
      }
  },
  watch: {
      $route(){
          this.listenRoute()
      }
  },
  methods: {
      listenRoute(){
            let path = this.$route.path
            let arr = path.split('/');
            arr.pop()
            this.path = arr.join('/')
            // console.log(this.path)
            this.changeTitle()
      },
      changeTitle(){
          let title = this.navList[this.activeIndex - 1].Name
          
          document.title = `${title}-应用系统综合解决方案-核心业务-慕登科技`
      }
  },
  mounted(){
      this.listenRoute()
  }
}

</script>
<style scoped>
.views{
    
    margin: 0px auto;
}
.nav{
    max-width: 1400px;
    margin: auto;
    border-bottom: 2px solid rgb(204, 204, 204);
}
.banner{
    height: 800px;
}
.banner .iframe{
    display: block;
    width: 100%;
    height: 100%;
}
.nav a:hover{
    text-decoration: none;
}
.el-menu-item{
    padding: 0 10px;
    margin: 0 25px;
}
.el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: 3px solid rgb(0, 122, 212);
}
.el-menu--horizontal>.el-menu-item:hover {
	color: rgb(0, 122, 212);
	border-bottom: 4px solid rgb(0, 122, 212) !important;
}
.el-menu--horizontal>.el-menu-item:hover  a{
	color: rgb(0, 122, 212);
}
.content{
	max-width: 1400px;
	margin: 10px auto;
}
</style>