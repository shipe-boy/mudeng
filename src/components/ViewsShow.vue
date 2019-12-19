<template>
  <div class="show">
      <!-- 条件选择 -->
      <div class="left">
          <div class="type" v-for="(item, index) in types" :key="index">
              <p class="t-title">{{item.name}}</p>
              <ul class="t-list">
                  <li :class="['item', {'active': typeActive[index] == i}]" v-for="(item1, i) in item.type" :key="i" @click="currentType(index, i)">{{item1}}</li>
              </ul>
          </div>
      </div>
      <!-- 列表展示 -->
      <div class="right">
          <h1 v-if="showList.length === 0">抱歉！暂无相关分类！</h1>
          <ul v-if="showList.length > 0" class="r-list" ref="listWrap">
              <li class="r-item" v-for="(item, index) in showList" :key="index">
                  <router-link target="_blank" :to="{path: path+ '/details/'+item.ID}">
					  <div class="pic-wrap">
						  <img class="pic" :src="item.ImagePath" :alt="item.Name">
					  </div>
                    
					<!-- <div class="pic" :style="{'background-image': 'url('+item.ImagePath+')'}"></div> -->
                    <div class="r-content">
                        <p class="r-title el1">{{item.Name}}</p>
						<!-- 新闻中心 -->
						<template v-if="showContent">
							<p class="time">{{item.PubDate.slice(0,10)}}</p>
							<p class="content el2">{{repalceHtml(item.Content)}}</p>
						</template>
						<template v-if="!showContent">
							<p class="r-desc el1" v-if="showDesc">{{item[desc]}}</p>
						</template>
						<!--<router-link target="_blank" :to="path+ '/details/'+item.ID"> -->
                        <p class="r-more" ><span>查看全部</span></p>
                    </div>
                  </router-link>
              </li>
          </ul>
          <!-- 分页器 -->
          <pagination :total="totalPage" :pageSize="pageSize"></pagination>
      </div>
  </div>
</template>

<script>
import Pagination from '../components/Pagination'
export default {
  data () {
    return {
        list: {},   //分类列表
        showList: [],   //展示列表
        totalPage: 0,
        page: 1,
        pageSize: 12,
        types: [],
        typeActive: [],   //条件选中样式
        desc: '',
		showDesc: false,	//是否显示分类
		showContent: false,	//是否显示内容
		oldPath: ''
    }
  },
  components: {
      Pagination
  },
  computed: {
     path(){
         let routeArr = this.$route.path.split('/')
        return routeArr.splice(0,2).join('/')
     }
  },
  watch: {
      $route(){
          this.listenRoute()
      }
  },
  methods: {
      listenRoute(){
        let path = this.$route.path;
		
        let id = this.$route.params.type
    
        //监听页数变化请求数据
        let page = this.$route.query.page
        this.page = page ? page : 1;
		console.log(this.oldPath === path)
		if(this.oldPath === path){	//条件筛选
			this._getList()
		}else{	//初次进来
			if(path.indexOf('/coreWork') > -1){
				this.showContent = false
				this.showDesc = false
				this.getType('BusinessClass')
			}else if(path.indexOf('/eg') > -1){
				this.showContent = false
				this.showDesc = true
				this.getType('CaseClass')
			}else if(path.indexOf('/news') > -1){
				this.showContent = true
				this.getType('NewsClass')
			}
		} 
		this.oldPath = path;
      },
      currentType(type, i){    //分类选中样式和筛选数据
        //   console.log(type, i)
            let path = this.$route.path
            this.typeActive.splice(type, 1, i)
            let queryObj = {}
            for(let j = 0; j < this.typeActive.length; j ++){
                queryObj['t'+j] = this.typeActive[j]
            }
            this.$router.push({
                path: path,
                query: queryObj
            })

            // this._getList()
      },
      _getList(){
          let path = this.$route.path
          let id = this.$route.params.type
          let typeArr = []    //['全部', '2019']
            for(let i = 0; i < this.typeActive.length; i++){
                if(path.indexOf( '/news') > -1 ){
                    typeArr.push(this.list[1][i].type[this.typeActive[i]])
                }else{
                    typeArr.push(this.list[id][i].type[this.typeActive[i]])
                }
            }
            // console.log(typeArr)
            //请求不同数据
            if(path.indexOf('/coreWork') > -1){
                this.getList('Business', 'BusinessClassID', id, typeArr)
                this.desc = "BusinessClassName"
            }else if(path.indexOf('/eg') > -1){
                this.getList('Case', 'CaseClassID', id, typeArr)
                this.desc = "CaseClassName"
            }else if(path === '/news/list'){
                this.getNewsList(typeArr)
                this.desc = "Abstract"
                this.newsTitle()
            }
      },
      getType(table){
            let type = this.$route.query;
            let data = {
                Action: "SearchAllEnabled",
                // Resource: "BusinessClass",
                PageControl: {
                    PageSize: 0,
                    PageIndex: 1,
                    OrderBy: "DisplayIndex DESC, ID DESC"
                }
            };
            data.Resource = table
            this.$.post("/api/Table/TableAction", data)
            .then(res => {
            //   console.log(JSON.parse(res.data).Rows)
                if(this.$route.path === '/news/list'){   //新闻资讯
                    let arr = JSON.parse(res.data).Rows.sort((a,b)=>{
                        return a.ID - b.ID
                    })
                    let year = new Date().getFullYear()
                    // console.log(year)
                    let obj = {
                        name: '按时间',
                        type: [ year, year-1, year-2, year - 3, year -4 + '及之前']
                    }
                    let obj1 = {
                        name: '按类型',
                        type: [arr[0].Name, arr[1].Name]
                    }
                    this.list[1] = []
                    this.list[1].push(obj)
                    this.list[1].push(obj1)
                    // console.log(this.list)
                    this.types = this.list[1]
                    this.typeActive = []
                    this.types.forEach((item, index)=>{
                        item.type.unshift('全部')
                        let a = type['t'+ index] ? type['t'+ index] : 0
                        this.typeActive.push(a)
                    })
                    //请求列表
                    // this._getList()
                    // console.log(this.typeActive) 
                    
                }else{
                    let arr = JSON.parse(res.data).Rows
					// console.log(arr)
                    arr.forEach(item => {   //每一个对象
                        if(this.$route.path.indexOf('/eg') > -1){     //多一个年份分类
                            let year = new Date().getFullYear()
                            // console.log(year)
                            let obj = {
                                name: '按时间',
                                type: [year, year-1, year-2, year - 3, year -4 + '及之前']
                            }
                            this.list[item.ID] = []
                            this.list[item.ID].push(obj)
                        }else{
                            this.list[item.ID] = []
                        }
                        
                        for(let i = 1; i < 7; i++){
                            if(item['ParaInfo'+i]){    //有条件
                                // this.list[item.ID]
								// console.log(item['ParaInfo'+i])
                                this.list[item.ID].push(this.handleType(item['ParaInfo'+i]))
                            }
                        }
                    });
                    // console.log(this.list)
                    let id = this.$route.params.type;
                    
                    if(id){
                        this.types = this.list[id]
                        this.typeActive = []
                        this.types.forEach((item, index)=>{
                            item.type.unshift('全部')
                            let a = type['t'+ index] ? type['t'+ index] : 0
                            this.typeActive.push(a)
                        })
                        //请求列表
                        // this._getList()
                        // console.log(this.typeActive)
                        
                    }
                }
                //请求列表
                this._getList()
            })
            .catch(err => {
              console.log(err);
            });
      },
      handleType(str){     //处理请求的分类
		let arr, name, type
		if(str.indexOf('：') > -1 || str.indexOf(':') > -1){
			arr = str.split('：')
			name = arr[0].replace('[M]', '');
			type = arr[1].split('，')
		}else{
			name = ''
			type = str.split('、')
		}
        
        return {name, type}
      },
      getList(table, classId, id, typeArr){
        //   console.log(typeArr)
          let data = {
                Action: "SearchBlurEnabled",
                // FieldNames: ["Name", "ID", "PubDate"],
                // Resource: "BusinessClass",
                // DataJSONString: JSON.stringify({[classId]: id}),
                PageControl: {
                    PageSize: this.pageSize,
                    PageIndex: this.page,
                    OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
                }
            };
            data.Resource = table
            data.DataJSONString = {}
            data.DataJSONString[classId] = id
            if(typeArr.length > 0){    //有条件的查询    ['全部', '3-4MM']
                for(let i = 0; i < typeArr.length; i++){
                    if(typeArr[i] !== '全部'){
                        if(this.$route.path.indexOf('/eg') > -1){   //有年份条件
                            if(i === 0){    //按年份分类
                                // console.log(typeArr[i])
                                if(typeof typeArr[i] === 'string'){     //...之前
                                    let year = typeArr[i].match(/\d+/g)[0]
                                    data.DataJSONString['PubDateEnd'] = `${year}-12-31 00:00:00`
                                }else{  //具体年
                                    data.DataJSONString['PubDateStart'] = `${typeArr[i]}-01-01 00:00:00`
                                    data.DataJSONString['PubDateEnd'] = `${typeArr[i]}-12-31 00:00:00`
                                }
                            }else{
                                data.DataJSONString['Para' + i] = `%${typeArr[i]}%`
                            }
                        }else{      //无年份分类
                            data.DataJSONString['Para' + (i + 1)] = `%${typeArr[i]}%`
                        }
                    }
                }
            }

            data.DataJSONString = JSON.stringify(data.DataJSONString)
            // console.log(data)
            this.$.post("/api/Table/TableAction", data)
                .then(res => {
                //   console.log(JSON.parse(res.data))
                  this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount
                    
                  this.showList = JSON.parse(res.data).Rows
                  // console.log(this.showList)
				  return
                }).then(()=>{
					let path = this.$route.path
					if(path.indexOf('/coreWork') > -1){
						if(!this.$refs.listWrap) return
						this.$refs.listWrap.className = 'r-list li-small' //260
					}else if(path.indexOf('/eg') > -1){
						if(!this.$refs.listWrap) return
						this.$refs.listWrap.className = 'r-list li-mid' //300
					}
				})
                .catch(err => {
                    console.log(err);
                });
      },
      getNewsList(typeArr){    //获取新闻
        let data = {
            Action: "SearchBlurEnabled",
            // FieldNames: ["Name", "ID", "PubDate"],
            Resource: "News",
            // DataJSONString: JSON.stringify({"NewsClassID": id}),
            PageControl: {
                PageSize: this.pageSize,
                PageIndex: this.page,
                OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
            }
        };
        data.DataJSONString = {}
        if(typeArr.length > 0){    //有条件
            for(let i = 0; i < typeArr.length; i++){
                if(typeArr[i] !== '全部'){
                    if(i === 0){    //按年份
                        // console.log(typeArr[i])
                        if(typeof typeArr[i] === 'string'){     //及之前的
                            let year = typeArr[i].match(/\d+/g)[0]
                            data.DataJSONString['PubDateEnd'] = `${year}-12-31 00:00:00`
                        }else{      //具体某一年的
                            data.DataJSONString['PubDateStart'] = `${typeArr[i]}-01-01 00:00:00`
                            data.DataJSONString['PubDateEnd'] = `${typeArr[i]}-12-31 00:00:00`
                        }
                    }else{  //行业   幕登
                        if(typeArr[1] === '行业动态'){
                            data.DataJSONString["NewsClassID"] = 1
                        }else{
                            data.DataJSONString["NewsClassID"] = 2
                        }
                        
                    }
                }
            }
        }
        data.DataJSONString = JSON.stringify(data.DataJSONString)
		 // console.log(data)
        this.$.post("/api/Table/TableAction", data)
            .then(res => {
                this.totalPage = JSON.parse(res.data).PagingInfo.AllRecordCount
                this.showList = JSON.parse(res.data).Rows 
                // console.log(this.showList)     
				return
            }).then(()=>{
				if(!this.$refs.listWrap) return
				this.$refs.listWrap.className = 'r-list li-big' //360
			})
            .catch(err => {
                console.log(err);
            });
      },
      more(item){
        //   {path: path+ '/details/'+item.ID}
        //   console.log(this.path)
          this.$router.push({
              path: this.path+ '/details/'+item.ID
          })
      },
      newsTitle(){  //新闻页面改变title
        document.title = `新闻中心-幕登科技`
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
  mounted(){
      this.listenRoute()
  }
}

</script>
<style scoped>
a:hover{
    text-decoration: none;
}
a{
    display: block;
	height: 100%;
}
.show{
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    max-width: 1431px;
    margin: 50px auto;
}
.show .left{
    width: 330px;
}
.left .type{
    margin-bottom: 20px;
}
.type .t-title{
    font-weight: 600;
    margin-bottom: 20px;
}
.type .t-list{
    overflow: hidden;
    font-size: 14px;
}
.type .item{
    float: left;
    box-sizing: border-box;
    width: 100px;
    height: 30px;
    border: 1px solid rgb(217, 217, 217);
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    line-height: 30px;
	font-size: 12px;
    cursor: pointer;
}
.type .item.active{
    color: rgb(0, 122, 212);
    border-color: rgb(0, 122, 212);
}


.right{
	flex: 1;
    /* width: 1000px; */
}
.right .r-list{
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    min-height: 960px;
}

.r-list .r-item{
	overflow: hidden;
    width: 290px;
    height: auto;
    margin-bottom: 30px; 
    margin-left: 77px;  
    cursor: pointer;
    /* border: 1px solid #aaa; */
	transition: .3s;
}
.r-list .r-item a{
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;
	/* align-items: center; */
}
.r-list .r-item .pic-wrap{
	width: 100%;
	height: 195px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.r-list .r-item .pic{
	/* width: auto; */
	max-height: 195px;
	max-width: 290px;
	/* height: 180px; */
}
/* .r-list li{
	height: 260px;
} */

.r-list.li-small li{
	max-height: 275px;
}

/* .r-list.li-small li .pic{
	height: 180px;
} */
.r-list.li-mid li{
	max-height: 315px;
}
/* .r-list.li-mid li .pic{
	height: 180px;
} */
.r-list.li-big li{
	max-height: 375px;
}
/* .r-list.li-big li .pic{
	height: 180px;
} */
.r-item:hover{
    box-shadow: 0 6px 20px rgba(0,0,0,0.18);
}
.r-item img{
    display: block;
}
.r-item .r-content{
    box-sizing: border-box;
    height: 120px;
    padding: 20px 20px 0;
    background: #fff;
}
.r-list.li-small li .r-content{
	height: 80px;
}
.r-list.li-mid li .r-content{
	height: 120px;
}
.r-list.li-big li .r-content{
	height: 180px;
}
.r-content .r-title{
    padding: 5px 0;
    font-size: 15px;
    color: #000;
}
.r-content .r-desc{
    padding: 5px 0;
    font-size: 14px;
    color: rgb(0, 122, 212);
}
.r-content .r-more{
	margin-top: 5px;
    text-align: right;
    font-size: 13px;
	color: rgb(0, 122, 212);
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
.r-more span{
    cursor: pointer;
}
@media screen and (max-width:1400px) {
	.r-list .r-item{
	    margin-left: 30px;
	}
}
@media screen and (max-width:1380px) {
	.show{
	    max-width: 1221px;
	}
	.show .left{
	    width: 300px;
	}
	.type .item{
	    width: 90px;
	}
	.r-list .r-item{
	    width: 276px;
	}
	.r-list .r-item{
	    margin-left: 22px;
	}
}

@media screen and (max-width:1200px) {
	.r-list .r-item{
		width: 44%;
		margin-left: 3%;
		margin-right: 3%;
		box-shadow: 0 6px 20px rgba(0,0,0,0.12);
		
	}
	/* .r-list .r-item .pic{
		height: auto;
	} */
}
	@media screen and (max-width:992px) {
		.show{
			flex-direction: column;
		}
		.show .left{
			width: 100%;
		}
		.show .left .type,
		.show .left .type .t-title{
			margin-bottom: 10px;
		}
		.r-list .r-item{
			margin-left: 15px;
		}
	}


	@media screen and (max-width:767px) {
		
		.left .type{
			width: 90%;
			margin: auto;
		}
		.type .item{
			width: 94px;
			height: 25px;
			line-height: 25px;
		}
		.r-list{
			justify-content: center;
		}
		.r-list .r-item{
			width: 80%;
			margin: 0;
			margin-top: 10px;
		}
		
		.r-list.li-small li{
			height: 275px;
		}
		.r-list.li-mid li{
			height: 315px;
		}
		.r-list.li-big li{
			height: 375px;
		}
		
		
		/* .r-list li .pic{
			height: auto;
		} */
		
		
	}

</style>