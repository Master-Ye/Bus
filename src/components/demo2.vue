<template>
    <div class=" mb-10 " >
    <!--    <dv-decoration-11 style="width:300px;height:100px;" class="dvde">

  <dv-digital-flop :config="config1" />


        </dv-decoration-11> -->
<v-chart :option="option" style="height:300px;width:700px;"  ></v-chart></div>
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
        text: 'Car quantity',

    },
    backgroundColor:'rgba(0,0,0,0)',
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['Car quantity']
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
        {name:"Range(km)",
            type : 'category',
            data :['0-5','5-10','10-15','15-20','20-25','25-30','30-35','35-40','<40']
        }
    ],

    yAxis : [
        {
            type : 'value'
        }
    ],

       grid: {
                left: '0%',
                right: '15%',
                bottom: '3%',
                containLabel: true
            },
    series : [
        {
            name:'Car quantity',
            type:'bar',
            label:{show:true,position:'top'},

            data:[361, 832, 749, 608, 441, 378, 158, 92, 109]
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