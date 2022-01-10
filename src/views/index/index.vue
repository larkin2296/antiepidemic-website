<template>
    <div id="app"></div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        if (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) {
            this.$router.push('/pc')
            return
        }
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.$router.push('/mobile')
            return
        }
    },
}
</script>