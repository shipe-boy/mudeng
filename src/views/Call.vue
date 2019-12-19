<!--  -->
<template>
  <div class="call">
      <div class="maps" ref="maps">

      </div>
      <div class="content">
          <p class="title">上海幕登电子科技发展有限公司</p>
          <p class="address"><span class="blod">总部地址：</span> 上海市松江区高技路655号绿亮科创园3号楼</p>
          <p class="address"><span class="blod">江西分公司地址：</span> 南昌市青山湖区高新大道818号中锐创业大厦A座7楼</p>
          <ul class="contact">
              <li class="item">
                  <div class="bg tell1"></div>
                  <p class="tell"> <span class="t-bold">电话：</span>021-37028076</p>
              </li>
              <li class="item">
                  <div class="bg tell2"></div>
                  <p class="tell"> <span class="t-bold">传真：</span>021-37028076</p>
              </li>
              <li class="item">
                  <div class="bg tell3"></div>
                  <div>
                      <p class="tell"> <span class="t-bold">重大项目联系人：</span>王先生</p>
                      <p class="tell"> <span class="t-bold">手机：</span>18017070799</p>
                  </div>
                  
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
      getMap(){
        //   console.log(BMap)
        let maps = this.$refs.maps;
        let map = new BMap.Map(maps);
        // map.centerAndZoom(new BMap.Point(121.299242,31.11126), 16);
        let point = new BMap.Point(121.299242,31.11126);
        map.centerAndZoom(point, 16);
        let marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中

        let html = [`<div class="box"><p class="m-title" style="color:rgb(0, 122, 212);font-size: 14px;font-weight: 600;">上海幕登电子科技发展有限公司</p><p class="m-address" style="font-size: 12px;">上海市松江区高技路655号绿亮科创园3号楼</p></div>`]
        let label = new BMap.Label(html,{offset:new BMap.Size(0,-50)});
        label.setStyle({
            border: '1px solid #eee',
            padding: '5px'
        });
        marker.setLabel(label);

        setTimeout(function(){
        // map.enableDragging();   //两秒后开启拖拽
        map.enableInertialDragging();   //两秒后开启惯性拖拽
        map.enableScrollWheelZoom(true);     //滚轮缩放
        }, 2000);
      },
      changeTitle(){
          document.title = `关于我们-慕登科技`
      },
	  getData(){
	      // console.log(this.$route.params)
	    let type = this.$route.params.type;
	    let data = {
	        Action: "SearchBlurEnabled",
	        Resource : 'CommonInfo',
	        DataJSONString: JSON.stringify({ 'CommonInfoType': '联系我们' }),
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
	              this.dataList = JSON.parse(res.data).Rows[0]
	            //   console.log(this.dataList)
	            })
	            .catch((err)=> {
	                console.log(err)
	            })
	  }
  },
  mounted(){
      this.getMap()
      this.changeTitle()
	  // this.getData()
  }
}

</script>
<style scoped>
.maps{
    height: 555px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .3)
}
.m-title{
    color:rgb(0, 122, 212);
    font-size: 14px;
    font-weight: 600;
}
.m-address{
    font-size: 12px;
}

.content{
    margin: 30px 0;
    text-align: center;
}
.content .title{
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
}
.content .address{
    /* margin-top: 20px; */
}
.content .address .blod{
    font-weight: 600;
}
.contact{
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100px; */
    /* width: 1170px; */
    margin: 60px auto;
}
.contact .item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 390px;
    padding: 20px 0;
    background: rgb(240, 242, 245);
}
.item .bg{
    width: 60px;
    height: 55px;
    margin-right: 15px;
}
.bg.tell1{
    background: url('../../static/images/tell1.png') no-repeat center;
}
.bg.tell2{
    background: url('../../static/images/tell2.png') no-repeat center;
}
.bg.tell3{
    background: url('../../static/images/tell3.png') no-repeat center;
}
.item .t-bold{
    font-weight: 800;
}


	@media screen and (min-width:1025px) {}

	@media screen and (max-width:1024px) {
		.contact{
			flex-direction: column;
		}
		.contact .item{
			margin-top: 10px;
		}
	}
	@media screen and (max-width:700px) {
		.maps{
			height: 200px;
		}
	}
</style>