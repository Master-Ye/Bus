<template>
<v-chart :option="options" style="width:600px;height:388px;" />
</template>

<script>
export default {
data(){
    return {
        options:{
                    title: {
                        top:"0%",
                        text: 'Car num',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: [
                            'ORIGINAL',
'Global optimization','Preference1','Preference2',],
right:50,
top:17,
                    },
                    grid: {
                        left: '0%',
                        right: '17%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['0-5','5-10','10-15','15-20','20-25','25-30','30-35',"35-40","<40"],
                            name:"Range(km)",
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'ORIGINAL',
                            type: 'bar',
                            data: [361, 832, 749, 608, 441, 378, 158, 92, 109],
                            color:"#1f77b4"
                        },
                        {
                            name: 'Global optimization',
                            type: 'bar',
                            data: [573, 891, 935, 715, 423, 112, 58, 13, 8],
                            color:"#ff7f0e"
                        },
                        {
                            name: 'Preference1',
                            type: 'bar',
                            data: [553, 806, 812, 571, 472, 157, 162, 98, 97],
                            color:"#2ca02c"
                        },
                        {
                            name: 'Preference2',
                            type: 'bar',
                            data: [453, 806, 731, 602, 430, 372, 153, 89, 92],
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