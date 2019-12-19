<!--  -->
<template>
  <div class="footer">
      <div class="top">
          <div class="t-content">
            <div class="logo">

            </div>
            <div class="line line1"></div>
            <div class="content" v-html="footerMsg.Content">
            </div>
            <div class="line"></div>
            <div class="er">

            </div>
          </div>
          
      </div>
      <div class="bottom">
          © 版权所有：上海幕登电子科技发展有限公司 沪ICP备15018530号-1
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
		footerMsg: {}
    }
  },
  methods:{
	  getData(){
		  let data = {
		  	Action: "SearchBlurEnabled",
		  	Resource: 'CommonInfo',
		  	DataJSONString: JSON.stringify({
		  		'CommonInfoType': 2
		  	}),
		  	PageControl: {
		  		PageSize: 1,
		  		PageIndex: 1,
		  		OrderBy: "DisplayIndex DESC, PubDate DESC, ID DESC"
		  	}
		  }
		  this.$.post("/api/Table/TableAction", data)
		      .then(res => {
				  // console.log(JSON.parse(res.data).Rows[0])
				  this.footerMsg = JSON.parse(res.data).Rows[0]
		      })
		      .catch(err => {
		          console.log(err);
		      });
	  }
  },
  mounted(){
	  this.getData()
  }
}

</script>
<style scoped>
.top{
    height: 160px;
    padding: 0 30px;
    margin-top: 50px;
    background-color: rgb(34, 34, 34);
    font-size: 14px;
    color: #fff;
}
.t-content{
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    height: 100%;
    padding: 0 30px;
    max-width: 1400px;
	margin: 0 auto;
}
.top .logo{
    box-sizing: border-box;
    padding: 50px 0;
    width: 240px;
    height: 100%;
    background: url('../../static/images/f-logo.png') no-repeat center/contain;
}
.top .content{
    box-sizing: border-box;
    padding: 50px 0;
    height: 100%;
    width: 665px;
}
.top .er{
    width: 100px;
    height: 100%;
    background: url('../../static/images/er.png') no-repeat center/contain;
}
.line{
    height: 120px;
    width: 2px;
    /* 909090 */
    background: #fff;
    background: -webkit-radial-gradient(circle, rgb(90, 90, 90), rgb(34, 34, 34)); /* Safari 5.1 - 6.0 */
    background: -o-radial-gradient(circle, rgb(90, 90, 90), rgb(34, 34, 34)); /* Opera 11.6 - 12.0 */
    background: -moz-radial-gradient(circle, rgb(90, 90, 90), rgb(34, 34, 34)); /* Firefox 3.6 - 15 */
    background: radial-gradient(circle, rgb(90, 90, 90), rgb(34, 34, 34));/* 标准的语法（必须放在最后） */
}

.bottom{
    margin: 20px 0;
    font-size: 12px;
    text-align: center;
}

@media screen and (max-width:992px) {
	.top{
		height: 128px;
		padding: 0;
	}
	.top .content{
		padding: 35px 0;
	}
}
@media screen and (max-width:767px) {
	.top{
		height: 96px;
	}
	.top .logo{
		width: 200px;
	}
	.top .er{
		width: 65px;
	}
	.line{
		height: 80px;
	}
	.content, .line1{
		display: none;
	}
	.line{
		margin: 0 5px;
	}
}
</style>