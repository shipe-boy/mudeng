<!-- 面包屑 -->
<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item 
            v-for="(item, index) in crumbsArr" 
            :key="index" 
            :to="item.path"
            >{{item.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="crumbsArr.length > 0 && dataList">{{dataList[className]}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
  
</template>

<script>
export default {
  data() {
    return {
        crumbsArr: [],
        typesList: [],
        dataList: {},
        className: ''
    };
  },
  watch:{
      $route(){
        this.listenRoute()
      }
  },
  methods: {
      listenRoute(){
          this.crumbsArr = [];
          let path = this.$route.path;
          let type = this.$route.params.type
        //   console.log(path,type)
          let obj = {
              name: '首页',
              path: '/'
          }
          this.crumbsArr.push(obj)
          let obj1 = {}
          if(path.indexOf('/coreWork') > -1){
              obj1.name = '核心业务'
              obj1.path = '/coreWork'
              this.className = 'BusinessClassName'
              this.getData('Business')
          }else if(path.indexOf('/eg') > -1){
              obj1.name = '案例中心'
              obj1.path = '/eg'
              this.className = 'CaseClassName'
              this.getData('Case')
          }else if(path.indexOf('/news') > -1){
              obj1.name = '新闻中心'
              obj1.path = '/news'
              this.className = 'NewsClassName'
              this.getData('News')
          }
          this.crumbsArr.push(obj1)
        //   console.log(this.crumbsArr)
      },
    getData(table){
      let id = this.$route.params.id;
      let data = {
        Action: "SearchID",
        Resource : table,
        DataJSONString: JSON.stringify({ "ID": id }),
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
              this.dataList = JSON.parse(res.data)[0]
            })
            .catch((err)=> {
              console.log(err)
            })
    }
  },
  mounted(){
      this.listenRoute()
  }
};
</script>
<style scoped>
.el-breadcrumb{
    display: inline-block;
    vertical-align: middle;
}

</style>