<!--  -->
<template>
  <div class="a-views">
      <div class="content-wrap" v-if="dataList">
          <div class="content" v-html="dataList.Content">

          </div>
      </div>
	  <div v-if="!dataList">暂无数据</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        dataList: {}
    }
  },
  watch: {
      $route(){
        //   console.log(this.$route.params)
          this.getData()
      }
  },
  methods: {
      getData(){
          // console.log(this.$route.params)
        let type = this.$route.params.type;
        let data = {
            Action: "SearchID",
            Resource : 'CommonInfo',
            DataJSONString: JSON.stringify({ 'ID': type }),
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
                  this.dataList = JSON.parse(res.data)[0]
                  // console.log(this.dataList)
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
.a-views{
    display: flex;
    justify-content: space-between;
    max-width: 1400px;
    margin: 50px auto;
}
.content-wrap{
	width: 90%;
	margin: 0 auto;
}
/deep/.content p{
    line-height: 1.5;
    margin: 15px 0;
}
/deep/.content img{
	max-width: 800px;
}
@media screen and (max-width:800px) {
	/deep/.content img{
		width: 100%;
	}
}
</style>