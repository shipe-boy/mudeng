<!--  -->
<template>
	<div class="details-w">
		<div class="details">
      <div class="b-crumbs">
        <crumbs></crumbs>
      </div>
      <details-banner></details-banner>
      <div class="nav">
          <div class="list">
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                  <el-menu-item :index="index + 1 + ''" v-for="(item, index) in list" :key="index"> <router-link :to="{path: path + '/' + item.ID}">{{item.Name}}</router-link></el-menu-item>
              </el-menu>
          </div>
      </div>

      <router-view></router-view>
  </div>
	</div>
  
</template>

<script>
import Crumbs from '../components/Crumbs'
import DetailsBanner from '../components/DetailsBanner'
export default {
  data () {
    return {
      list: [
        {
          ID: 1,
          Name: "案例展示",
        }
      ]
    }
  },
  components: {
    Crumbs,
    DetailsBanner
  },
  computed: {
    activeIndex(){
      return this.$route.params.nav
    },
    path(){
      
      let arr = this.$route.path.split('/')
      arr.pop()
      // console.log(arr.join('/'))
      return arr.join('/')
    }
  },
  methods: {
    getDetails(){
      let id = this.$route.params.id
      // console.log(id)
      let data = {
        Action: "SearchID",
        // FieldNames: ["Name", "ID", "PubDate"],
        Resource: "Business",
        DataJSONString: JSON.stringify({"BusinessClassID": id}),

      };
      this.$.post("/api/Table/TableAction", data)
          .then(res => {
            console.log(JSON.parse(res.data))

              
          })
          .catch(err => {
              console.log(err);
          });
    }
  },
  mounted(){
    // this.getDetails()
  }
}

</script>
<style scoped>
.nav{
    height: 65px;
    margin-top: 40px;  
}
.nav .list{
  max-width: 1400px;
  margin: auto;
  border-bottom: solid 1px #e6e6e6;
}
.nav a{
    display: block;
}
.nav a:hover{
    text-decoration: none;
}
.list{
    display: flex;
    max-width: 1400px;
    height: 100%;
    margin: 0 auto;
    line-height: 65px;
    /* box-shadow: 1px 1px 10px rgba(0, 0, 0, .5) */
}
.el-menu{
  width: 100%;
}
.el-menu--horizontal>.el-menu-item{
    height: 65px;
    line-height: 65px;
    padding: 0 10px;
    margin: 0 30px;
    color: #333;
}
.el-menu--horizontal>.el-menu-item.is-active{
    color: rgb(0, 122, 212);
    border-bottom: 4px solid rgb(0, 122, 212);
}
.el-menu--horizontal>.el-menu-item:hover {
	color: rgb(0, 122, 212);
	border-bottom: 4px solid rgb(0, 122, 212) !important;
}
.el-menu--horizontal>.el-menu-item:hover  a{
	color: rgb(0, 122, 212);
}
</style>