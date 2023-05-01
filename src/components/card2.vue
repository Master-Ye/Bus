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
              <span>请选择方案</span>
              <q-select
                v-model="selectedValue1"
                :options="options1"
                label="Select 1"
                style="display: inline-block; width: 170px"
                class="relative left-3"
              />
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
  },
  data() {
    return {
      options1: [
        { label: "全局优化", value: 1 },
        { label: "偏好方案1", value: 2 },
        { label: "偏好方案2", value: 3 },
      ],
      selectedValue1: null,
      selectedValue2: null,
    };
  },
  computed: {
    parkpointdata() {
      var res = [];
      for (var i = 0; i < this.$store.state.diffdata14.parkcapacity.length; i++) {
        res.push({
          name: this.$store.state.diffdata14.parkcapacity[i][1],
          value: this.$store.state.diffdata14.parkcapacity[i][0].concat(
            this.$store.state.diffdata14.parkcapacity[i][2]
          ),
        });
      }
      return res;
    },
    stationpointdata() {
      var res = [];
      for (var i = 0; i < this.$store.state.diffdata14.stationdata.length; i++) {
        res.push({
          name: this.$store.state.diffdata14.stationdata[i][1],
          value: this.$store.state.diffdata14.stationdata[i][0],
        });
      }
      return res;
    },
  },
  methods: {},
  watch: {
    selectedValue1(newvalue) {
      console.log(newvalue.value);
      let linedata = [];
      switch (newvalue.value) {
        case 3: {
          console.log("111");
          linedata = line(this.$store.state.diffdata14.GSdata);
        }
      }
      let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
      var myChart = echarts.init(document.getElementById("main111"));
      myChart.clear();
      const parkpointdata = this.parkpointdata;

      const stationpointdata = this.stationpointdata;

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
            categories: ["原始方案", "偏好方案"],
            inRange: {
              color: ["#db253e", "#6ab92c"],
            },
            seriesIndex: 2,
            right: "35%",
            bottom: "20%",
            backgroundColor: "#ffffff",
          },
        ],
        series: [
          {
            type: "scatter",
            coordinateSystem: "bmap",
            data: parkpointdata,
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
            data: stationpointdata,
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
            data: linedata,
            symbol: ["none", "arrow"],
            symbolSize: [0, [6, 20]],
          },
        ],
      });
    },
  },
};
</script>

<style>
.my-card {
  height: 100%;
  max-height: 1200px;
}
</style>
