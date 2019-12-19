<!--  -->
<template>
  <div>
    <news-banner></news-banner>
    <views-show></views-show>

  </div>
</template>

<script>
import NewsBanner from '../components/NewsBanner'
import ViewsShow from '../components/ViewsShow'
export default {
  data () {
    return {
    }
  },
  components: {
    NewsBanner,
    ViewsShow
  }
}

</script>