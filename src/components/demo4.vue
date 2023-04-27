<template>
    <div>

<dv-scroll-board :config="config" style="width:500px;height:220px" />
        </div>
</template>

<script>

export default {
    data(){return {
        config: { header: ['公交ID', '当前停车场', '原始停车场'],
  data:[[]]
,
  index: true,
  columnWidth: [50],
  align: ['center']}}

},
computed: {
    nowgap() {
        return this.$store.state.nowgap
    }
},
watch:{
nowgap(){
this.config.data=this.$store.state.nowgap
}
}
}

</script>

<style>

</style>