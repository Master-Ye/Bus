<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label class="text-xl font-extrabold">两个方案地图比较</q-item-label>
          <q-item-label caption> 两个方案地图之间不同的地方进行可视化 </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          <q-row>
            <q-col style="display: inline-block">
              <span>请先选择第一个方案</span>
              <q-select
                v-model="selectedValue1"
                :options="options1"
                label="Select 1"
                style="display: inline-block; width: 170px"
                class="relative left-3"
              />
              <span class="relative left-10">请选择第二个方案</span>
              <q-select
                v-model="selectedValue2"
                :options="options2"
                label="Select 2"
                style="display: inline-block; width: 170px"
                class="relative left-15"
              />
              <q-btn color="secondary" label="确认比较"  class="relative left-30" @click="compare "/>
<span class="relative left-60 text-center">只显示超过<q-input v-model="text"  style="display: inline-block; width: 50px" />KM的数据</span>


            </q-col>

            <q-col
              style="display: block; width: 1100px; height: 700px; padding: 0px"
              class="mt-5"
            >
              <div id="main111" class="h-[calc(100%)]"></div>
            </q-col>
          </q-row>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import kmselect from "../utils/kmselect.js";
import difparkpointdata from "../utils/difparkpointdata.js";
import parkstationpointdata from "../utils/parkstationpointdata.js";
import line from "../utils/difline.js";
export default {
  mounted() {
    let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
    this.centerCity = centerCity;
    var myChart = echarts.init(document.getElementById("main111"));
    console.log(centerCity.lng, centerCity.lat);
    //var myChart2 = echarts.init(document.getElementById("main"));
    var option = {
      bmap: {
        center: [centerCity.lng, centerCity.lat], //  中心点
        zoom: 12, //  放大倍数
        roam: true,
        mapStyle: {
          styleJson: [
            {
              featureType: "water",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "land",
              elementType: "all",
              stylers: {
                color: "#f3f3f3",
              },
            },
            {
              featureType: "railway",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "highway",
              elementType: "all",
              stylers: {
                color: "#999999",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.fill",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "green",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "subway",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "manmade",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "local",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "boundary",
              elementType: "all",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "building",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "label",
              elementType: "labels.text.fill",
              stylers: {
                color: "rgba(0,0,0,0)",
              },
            },
          ],
        },
      },
    };
    myChart.setOption(option);
    var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
    heatmap_C_1.addControl(new BMap.NavigationControl());
    heatmap_C_1.disableScrollWheelZoom()
  },
  data() {
    return {
      index:"",
      linedata: [],
     parkpointdata : [],
     stationpointdata : [],
      text:0,
      options1: [
        {label:"原始方案",value:0},
        { label: "全局优化", value: 1 },
        { label: "偏好方案1", value: 2 },
        { label: "偏好方案2", value: 3 },
      ],

      selectedValue1: null,
      selectedValue2:null,

    };
  },
  computed: {
options2(){
  return this.options1.filter(item => item != this.selectedValue1)
}

  },
  methods: {
  compare(){

if(this.selectedValue1==null||this.selectedValue2==null||(this.selectedValue1==this.selectedValue2))
{return}
if(this.selectedValue1.value+this.selectedValue2.value==1)
{
  this.linedata = this.$store.state.diffdata12.data;
          this.parkpointdata=this.$store.state.diffdata12.parkcapacity;
          this.stationpointdata=this.$store.state.diffdata12.stationdata;
this.index=1
}
if(this.selectedValue1.value+this.selectedValue2.value==2)
{
  this.linedata = this.$store.state.diffdata13.data;
          this.parkpointdata=this.$store.state.diffdata13.parkcapacity;
          this.stationpointdata=this.$store.state.diffdata13.stationdata;
          this.index=2
}
if(this.selectedValue1.value+this.selectedValue2.value==3)
{if(this.selectedValue1.value==0||this.selectedValue2.value==0)
  { this.linedata = this.$store.state.diffdata14.data;
    this.parkpointdata=this.$store.state.diffdata14.parkcapacity;
    this.stationpointdata=this.$store.state.diffdata14.stationdata;
    this.index=3}
  else{
    this.linedata = this.$store.state.diffdata23.data;
    this.parkpointdata=this.$store.state.diffdata23.parkcapacity;
    this.stationpointdata=this.$store.state.diffdata23.stationdata;
    this.index=4
  }
}
if(this.selectedValue1.value+this.selectedValue2.value==4)
{
  this.linedata = this.$store.state.diffdata24.data;
    this.parkpointdata=this.$store.state.diffdata24.parkcapacity;
    this.stationpointdata=this.$store.state.diffdata24.stationdata;
    this.index=5
}
if(this.selectedValue1.value+this.selectedValue2.value==5)
{
  this.linedata = this.$store.state.diffdata34.data;
    this.parkpointdata=this.$store.state.diffdata34.parkcapacity;
    this.stationpointdata=this.$store.state.diffdata34.stationdata;
    this.index=6
    console.log(this.linedata)
}
this.go(this.parkpointdata,this.stationpointdata,this.linedata,this.index-1,this.text);


  },
go(parkpointdata,stationpointdata,linedata,index,limit)
{
  console.log(linedata)
  const linedata1=kmselect(linedata,limit)

let tuli=[["原始方案","全局优化方案"],["原始方案","偏好方案1"],["原始方案","偏好方案2"],["全局优化方案","偏好方案1"],["全局优化方案","偏好方案2"],["偏好方案1","偏好方案2"]]
let tulicolor=[["#2764a5","#eb7f21"],["#2764a5","#379c3a"],["#2764a5","#c83537"],["#eb7f21","#379c3a"],["#eb7f21","#c83537"],["#379c3a","#c83537"]]
  let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
      var myChart = echarts.init(document.getElementById("main111"));
      myChart.clear();


      myChart.setOption({
        tooltip: {

showContent: true,
formatter: '{b}:{c}'
},
        bmap: {
          center: [centerCity.lng, centerCity.lat], //  中心点
          zoom: 12, //  放大倍数
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#999999",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "rgba(0,0,0,0)",
                },
              },
            ],
          },
        },

        visualMap: [
          {
            type: "piecewise",
            dimension: 1,
            categories: tuli[index],
            inRange: {
              color: tulicolor[index],
            },
            seriesIndex: 2,
            right: "10%",
            bottom: "10%",
            backgroundColor: "#ffffff",
          },
        ],
        series: [
          {
            type: "scatter",
            coordinateSystem: "bmap",
            data: difparkpointdata(parkpointdata),
            symbolSize: 8,
            encode: {
              value: 2,
            },
            zlevel: 4,
            itemStyle: {
              color: "red",
            },
          },
          {
            type: "scatter",
            coordinateSystem: "bmap",
            data: parkstationpointdata(stationpointdata),
            symbolSize: 3,
            encode: {
              value: 2,
            },
            zlevel: 3,
            itemStyle: {
              color: "#0000ff",
            },
          },
          {
            name: "匈牙利",
            type: "lines",
            coordinateSystem: "bmap",
            data: line(linedata1,index),
            symbol: ["none", "arrow"],
            symbolSize: [0, [6, 20]],
          },
        ],
      });
      console.log(line(linedata1,index+1))
      var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
    heatmap_C_1.addControl(new BMap.NavigationControl());
    heatmap_C_1.disableScrollWheelZoom()
}
  },
  watch: {

  text(newvalue)
  {

this.go(this.parkpointdata,this.stationpointdata,this.linedata,this.index-1,newvalue);

  }
  },
};
</script>

<style>
.my-card {
  height: 100%;
  max-height: 1200px;
}
</style>
