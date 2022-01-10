<template>
    <div id="app">
    <detailpage :id="id"></detailpage>
  </div>
</template>

<script>
import Detailpage from '../../components/detailpage/index.vue'
export default {
    components: {
        Detailpage
    },
    data(){
        return {
            id: this.$route.params.id
        }
    },
}
</script>

<style scoped>
@import '../../css/mobile.scss'
</style>