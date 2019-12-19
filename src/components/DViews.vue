<!-- 案例中心和核心业务详情页展示 -->
<template>
  <div class="details-wrap">
      <!-- 核心业务 -->
      <template v-if="!toggleShow">
		<p v-show="nav == 1" v-html="dataList.Abstract"></p>
        <p v-show="nav == 2" v-html="dataList.Parameter"></p>
        <p v-show="nav == 3" v-html="dataList.Application"></p>
      </template>

      <!-- 案例中心 -->
      <template v-if="toggleShow">
        <p v-html="dataList.Introduction"></p>
      </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggleShow: false,
      dataList: {}
    }
  },
  watch: {
    $router(){
      this.listenRoute()
    }
  },
  computed: {
    nav(){
      return this.$route.params.nav;
    }
  },
  methods: {
    listenRoute(){
      // this.nav = this.$route.params.nav;
      // console.log(this.nav)
      if(this.$route.path.indexOf('/coreWork') > -1){ //核心业务
        this.toggleShow = false
        this.getData('Business')
      }else{  //案例中心
        this.toggleShow = true
        this.getData('Case')
      }
    },
    getData(table){
      let id = this.$route.params.id;
      // let nav = this.$router
      // console.log(id)
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
              this.dataList = JSON.parse(res.data)[0]
              // console.log(this.dataList)
              this.changeTitle()
            })
            .catch((err)=> {
              console.log(err)
            })
    },
    changeTitle(){
      let str = ''
      let className = ''
      if(this.$route.path.indexOf('coreWork') > -1){
        str = '核心业务'
        className = 'BusinessClassName'
      }else{
        str = '案例中心'
        className = 'CaseClassName'
      }
      document.title = `${this.dataList.Name}-${this.dataList[className]}-${str}-慕登科技`
    }
  },
  mounted(){
    this.listenRoute()
  }
}

</script>
<style scoped>
.details-wrap{
  margin-top: 40px;
}
.details-wrap p{
  /* text-indent: 2rem; */
  /* line-height: 1.8; */
}
/deep/.details-wrap img{
	display: block;
	max-width: 1000px;
	margin: auto;
}

@media screen and (max-width:1000px) {
	/deep/.details-wrap img{
		max-width: 100%;
	}
}
</style>