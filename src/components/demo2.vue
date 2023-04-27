<template>
    <div class=" mb-10">
    <!--    <dv-decoration-11 style="width:300px;height:100px;" class="dvde">

  <dv-digital-flop :config="config1" />


        </dv-decoration-11> -->
<v-chart :option="option" style="height:300px;width:400px"  ></v-chart></div>
</template>

<script>

export default {
    watch:{
nowwm(newVal){
    this.option.series[0].data=newVal

}

    },
computed: {
wmgap() {
let result=parseInt(this.$store.getters.nowwmgap)
    return result

},
nowwm() {
    return this.$store.state.truewm
}
},
data(){
    return {
        config1:{
    number: [0],
  content: '当前减少里程: {nt}万米',
  textAlign:"center",
  style: {
  fontSize: 17,
  fill: '#2bc0f7',

}
},
option:{

  title : {
        text: '花费里程',
        subtext: '单位:万米'
    },
    backgroundColor:'rgba(0,0,0,0)',
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['花费里程']
    },
    color:'#1e85ab',
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {name:"车辆id",
            type : 'category',
            data :['1-x','2-x','3-x','6-x','7-x','8-x','15-x']
        }
    ],

    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'花费里程',
            type:'bar',
            label:{show:true,position:'top'},

            data:[604.1864, 1097.2976, 867.8798, 1130.6751, 1048.0930, 1320.5689, 14.2929]
,
            barWidth:38,
           /* markLine : {
                data : [
                     {name: '两个坐标之间的标线',yAxis: 0},
                ]
            }*/
        }
    ]
 },}}}
</script>

<style scoped>
.fanpai{
width:300px;
height: 100px;
}
.dvde{
display: flex;
justify-content: center;
align-items: center;
}
</style>