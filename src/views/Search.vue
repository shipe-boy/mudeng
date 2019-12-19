<!-- 搜索页面 -->
<template>
  <div>
        <banner-views></banner-views>

        <div class="wrap">
            <div class="search-wrap">
                <div class="search">
                    <input type="text" name="" v-model.trim="query" id="" placeholder="请输入您要搜索的关键词" @keydown.enter="search">
                    <button @click="search">搜索</button>
                </div>
                <p class="msg">为您找到“<span class="blue">{{query1}}</span>”的相关结果 <span class="blue">{{totalPage}}</span> 条 </p>
            </div>
            <!-- 结果 -->
            <div class="result">
                <div class="nav">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                        <el-menu-item :index="index + 1 + ''" v-for="(item, index) in navList" :key="index" @click.native="chooseType(index)">{{item}}</el-menu-item>
                    </el-menu>
                </div>

                <ul class="list" v-if="resultList.length > 0" ref="list">
                    <li class="list-item" v-for="(item, index) in resultList" :key="index" @click="more(item)">
						<div class="pic-wrap">
							<img class="pic" :src="item.ImagePath" :alt="item.Name"  style="max-width: 290px;max-height: 195px;">
						</div>
                        
                        <div class="content">
							<p class="title el1">{{item.Name}}</p>
							<!-- 新闻中心 --> 
							<template v-if="showContent">
								<p class="time">{{item.PubDate.slice(0,10)}}</p>
								<p class="item-content el2">{{repalceHtml(item.Content)}}</p>
							</template>
							<template v-if="!showContent">
								<p class="desc el1" v-if="showDesc">{{item.CaseClassName}}</p>
							</template>
							<p class="more"> <span>查看更多</span> </p>
                            <!-- <p class="title el1">{{item.Name}}</p>
                            <p class="time">{{item.PubDate.slice(0, 10)}}</p>
                            <p class="desc">{{item.Abstract}}</p>
                            <p class="more" @click="more(item)"> <span>查看全部</span> </p> -->
                        </div>
                    </li>
                </ul>
                <div v-if="resultList.length <= 0">
                    <p>抱歉！未找到相关结果！</p>
                </div>

                <!-- 分页器 -->
                <pagination :total="totalPage" :pageSize="pageSize"></pagination>   
            </div>


        </div>
      
        
  </div>
</template>

<script>
import BannerViews from '../components/BannerViews'
import Pagination from '../components/Pagination'
export default {
  data () {
    return {
        query: '',
        query1: '', //初始值
        navList: ['新闻中心', '案例中心', '核心业务'],
        table: ['News', 'Case', 'Business'],
        // 分页器
        totalPage: 10,
        pageSize: 8,
        page: 1,    //当前页
        resultList: [],
		showContent: false,
		showDesc: false
    }
  },
  components: {
      BannerViews,
      Pagination
  },
  computed: {
      activeIndex(){
          return this.$route.query.type + ''
      }
  },
  watch: {
      $route(){
          this.listenRoute()
      }
  },
  methods: {
    listenRoute(){
        this.query1 = this.$route.query.query
        this.page = this.$route.query.page || 1
        this.getData()
    },
    search(){
        if(!this.query) return
        let type = this.$route.query.type || 1
        this.$router.push({
            path: '/search',
            query: {
                query: this.query,
                type: type
            }
        })
    },
    chooseType(type){
        this.$router.push({
                path: '/search',
                query: {
                    query: this.query || this.query1,
                    type: type + 1
                }
            })
    },
    getData(){
        let tableIndex = this.$route.query.type;
        // console.log(tableIndex)
        let data = {
            Action: "SearchBlurEnabled",
            // Resource : 'ADLink',
            // DataJSONString: JSON.stringify({ ADArea: "1" }),
            PageControl: {
            PageSize: this.pageSize,
            PageIndex: this.page,
            OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
            }
        }
        data.Resource = this.table[tableIndex - 1]
        data.DataJSONString = JSON.stringify({ Name: `%${this.query1}%`, Content: `%${this.query1}%` }),
        // console.log(data)
        this.$.post("/api/Table/TableAction", data)
            .then((res) => {
                // console.log(JSON.parse(res.data))
                this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount
                this.resultList = JSON.parse(res.data).Rows
                // console.log(this.resultList)
				return
            }).then(()=>{
				let type = this.$route.query.type;
				if(type == 1){	//新闻中心
					this.showContent = true
					this.$refs.list.className = 'list li-big'
				}else if(type == 2){	//案例中心
					this.showContent = false
					this.showDesc = true
					this.$refs.list.className = 'list li-mid'
				}else if(type == 3){	//核心业务
					this.showContent = false
					this.showDesc = false
					this.$refs.list.className = 'list li-small'
				}
			})
            .catch((err)=> {
                console.log(err)
            })
    },
	repalceHtml(str){
		// console.log(str)
		if(!str) return
		var dd=str.replace(/<\/?.+?>/g,"");
		var dds=dd.replace(/ /g,"");//dds为得到后的内容
		var html = dds.replace(/&nbsp;/g, '')
		return html;
	},
    more(item){
        // /eg/details/23/1
        // /news/details/2
        // /coreWork/details/4/1
        let type = this.$route.query.type;
        let path = '/news'
        if(type == 1){
            path = `/news/details/${item.ID}`
        }else if(type == 2){
            path = `/eg/details/${item.ID}/1`
        }else if(type == 3){
            path = `/coreWork/details/${item.ID}/1`
        }
		let {href} = this.$router.resolve({
		    path: path
		});
		    
		window.open(href, '_blank')
        // this.$router.push({
        //     path: path
        // })
    }
      
  },
  mounted(){
      this.listenRoute()
  }
}

</script>
<style scoped>
.wrap{
    max-width: 1400px;
    margin: 50px auto;
}
.search-wrap{
    text-align: center
}
.search{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 660px;
    height: 70px;
    margin: 15px auto;
    background: rgb(234, 235, 237);
    border-radius: 5px;
}
.search-wrap input{
    width: 510px;
    height: 45px;
    outline: none;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 3px;
}
.search-wrap button{
    box-sizing: border-box;
    width: 115px;
    height: 45px;
    background: rgb(0, 122, 212);
    border-radius: 3px;
    color: #fff;
    outline: none;
    border: none;
}
.msg .blue{
    color: rgb(0, 122, 212);
}
.result{
    margin-top: 50px;
    /* border-bottom: 2px solid rgb(204, 204, 204); */
}
.result .nav{
    max-width: 1400px;
    margin: auto;
}
.el-menu--horizontal>.el-menu-item{
    padding: 0 10px;
    margin: 0 25px;
}
.el-menu--horizontal>.el-menu-item.is-active{
	color: rgb(0, 122, 212);
    border-bottom: 4px solid rgb(0, 122, 212);
}
.el-menu--horizontal>.el-menu-item:hover {
	color: rgb(0, 122, 212)!important;
	border-bottom: 4px solid rgb(0, 122, 212) !important;
}
.el-menu--horizontal>.el-menu-item:hover  a{
	color: rgb(0, 122, 212) !important;
}

/* 列表 */
.result .list{
    display: flex;
    flex-wrap: wrap;
	align-content: flex-start;
    min-height: 840px;
    padding: 20px;
    margin-top: 10px;
}
/* .list.li-small li{
	height: 260px;
}
.list.li-mid li{
	height: 300px;
}
.list.li-big li{
	height: 360px;
} */
.list .list-item{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
    width: 290px;
    /* height: 360px; */
	/* height: auto; */
    margin: 20px 18px;
	cursor: pointer;
}
.list.li-small li{
	max-height: 275px;
}
.list.li-mid li{
	max-height: 315px;
}
.list.li-big li{
	max-height: 375px;
}
.list-item:hover{
    box-shadow: 1px 3px 5px rgba(0, 0, 0, .5)
}
.list-item .pic-wrap{
	width: 100%;
	height: 195px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.list-item .pic{
    display: block;
}
.list-item .content{
    box-sizing: border-box;
    height: 180px;
    padding: 20px;
    background-color: #fff;
    color: rgb(102, 102, 102);
}

.list.li-small li .content{
	height: 80px
}
.list.li-mid li .content{
	height: 120px
}
.list.li-big li .content{
	height: 180px
}
.content .title{
    padding: 5px 0;
    font-size: 15px;
    color: #000;
}
.content .time{
	font-size: 12px;
	color: #999;
	margin: 10px 0;
}
.content .item-content{
	overflow: hidden;
	font-size: 12px;
	height: 48px;
	color: #333;
	line-height: 2;
}
.content .desc{
    padding: 5px 0;
    font-size: 14px;
    color: rgb(0, 122, 212);
}
.content .more{
    margin-top: 5px;
    text-align: right;
    font-size: 13px;
    color: rgb(0, 122, 212);
}
.content .more span{
    cursor: pointer;
}


@media screen and (max-width:992px) {
	.list{
		justify-content: space-around;
	}
}


@media screen and (max-width:767px) {
	.search{
		width: 90%;
		height: 60px;
		margin: auto;
	}
	.search input{
		width: 70%;
	}
	.search button{
		width: 25%;
	}
	.el-menu-item{
		margin: 0 !important;
	}
	.list{
		justify-content: center;
	}
	.list .list-item{
		width: 80%;
	}
	.list.li-small li.list-item{
		max-height: none;
	}
	.list-item .pic{
	    height: auto;
	}
}
</style>