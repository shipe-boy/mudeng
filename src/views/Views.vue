<!--  -->
<template>
  <div>
      <banner-views></banner-views>
      <v-nav></v-nav> 

        <!-- 展示区域 -->
        <views-show></views-show>

  </div>
</template>

<script>
import BannerViews from '../components/BannerViews'
import VNav from '../components/Nav'
import ViewsShow from '../components/ViewsShow'

export default {
  data () {
    return {
    }
  },
  components: {
      BannerViews,
      VNav,
      ViewsShow
  }
}

</script>
