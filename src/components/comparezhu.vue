<template>
<v-chart :option="options" style="width:500px;" />
</template>

<script>
export default {
data(){
    return {
        options:{
                    title: {
                        text: '车辆里程对比',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: [
                            '原始方案',
'全局优化','偏好方案1','偏好方案2',],
right:10
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1-x','2-x','3-x','6-x','7-x','8-x','15-x']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '原始方案',
                            type: 'bar',
                            data: [6041864, 10972976, 8678798, 11306751, 10480930, 13205689, 142929],
                            color:"#1f77b4"
                        },
                        {
                            name: '全局优化',
                            type: 'bar',
                            data: [5805635, 7835047, 8335704, 7858681, 8814171, 7880740, 102856],
                            color:"#ff7f0e"
                        },
                        {
                            name: '偏好方案1',
                            type: 'bar',
                            data: [5773447, 10618052, 8181671, 10354149, 9624149, 10593345, 142929],
                            color:"#2ca02c"
                        },
                        {
                            name: '偏好方案2',
                            type: 'bar',
                            data: [5869975, 10536684, 8608632, 10926790, 10289569, 12515742, 108833],
                            color:"#d62728"
                        }

                    ]
                }

    }
}
}
</script>

<style>

</style>