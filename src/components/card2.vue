<template>
<div class="q-pa-md row items-start q-gutter-md" >


    <q-card class="my-card" flat bordered>
      <q-item>



        <q-item-section>
          <q-item-label class="text-xl font-extrabold">两个方案地图比较</q-item-label>
          <q-item-label caption>
           两个方案地图之间不同的地方进行可视化
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
            <q-row>
    <q-col style="display:inline-block;">
        <span>请选择第一个方案</span>
      <q-select
        v-model="selectedValue1"
        :options="options1"
        label="Select 1"
        @update:model-value="handleSelect1Change"
        style="display:inline-block; width:170px;"
        class="relative left-3"
      />
    </q-col>
    <q-col style="display:inline-block;" class="relative left-20">
        <span>请选择第二个方案</span>
      <q-select
        v-model="selectedValue2"
        :options="options2"
        label="Select 2"
        :option-disable="disableOptions"
        style="display:inline-block;width:170px;"
        class="relative left-3"
      />
    </q-col>
    <q-col  style="display:block;width: 1100px; height: 700px;padding:0px;" class="mt-5">
        <div id="main111" ></div>
    </q-col>
  </q-row>
        </q-card-section>


      </q-card-section>
    </q-card>


  </div>
</template>

<script>
export default {
mounted(){
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
},
  data() {
    return {
      options1: [
        { label: "原始方案", value: 1 },
        { label: "全局优化", value: 2 },
        { label: "偏好方案1", value: 3 },
        { label: "偏好方案2", value: 4 },

      ],
      selectedValue1: null,
      selectedValue2: null,
    };
  },
  computed: {
options2(){
let temp=this.selectedValue1
 let   arr = this.options1.filter(function(elem) {
  return elem !== temp;
});
return arr
}
  },
  methods: {

  },
};
</script>

<style>
.my-card
 { height: 100%;
  max-height: 1200px;}
</style>