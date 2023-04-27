<template>
  <div class="relative">

    <v-chart
      style="width: 160px; height: 160px"
      :option="smalloption"
      class="absolute bottom-0 left-0 mb-20"
      v-if="this.smalloption.series[0].data.length != 0"
    ></v-chart>
  </div>
</template>

<script>
import getsmallpie from "../utils/getsmallpie.js";

import parkparkpointdata from "../utils/parkparkpointdata.js";
import line from "../utils/line.js";
import parkstationpointdata from "../utils/parkstationpointdata.js";
import "echarts/extension/bmap/bmap";
import * as echarts from "echarts";
export default {
  mounted() {
    let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
    this.centerCity = centerCity;
    var myChart = echarts.init(document.getElementById("main2"));

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
      tooltip: {
        showContent: true,
        formatter: "{b}:{c}",
      },
    };

    myChart.setOption(option);

    var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
    heatmap_C_1.addControl(new BMap.NavigationControl());


  },
  watch: {
    nowparkid(newid) {
      let station = [];
      let park = [];
      let res = [];
      let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
      var myChart = echarts.init(document.getElementById("main2"));
      let i = newid.nowparkindex;
      if (i == null) return;
      let array = [];
      let j = this.$store.state.nowway;
      myChart.clear();
      var option = {
        tooltip: {
          showContent: true,
          formatter: "{b}:" + "{c}",
        },
        bmap: {
          center: [centerCity.lng, centerCity.lat], //  中心点
          zoom: 11, //  放大倍数
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
      switch (j) {
        case 1:
          {
            res = line(this.$store.state.parkrawdata[i][1]);
            array = findarray(
              this.$store.state.rawpiedata,
              this.$store.state.nowparkname
            );
            park = parkparkpointdata(this.$store.state.rawstationforpark[i][0]);
            station = parkstationpointdata(this.$store.state.rawstationforpark[i][1]);
          }
          break;
        case 2:
          {
            array = findarray(
              this.$store.state.gdxpiedata,
              this.$store.state.nowparkname
            );
            res = line(this.$store.state.parkgdxdata[i][1]);

            park = parkparkpointdata(this.$store.state.gdxstationforpark[i][0]);
            station = parkstationpointdata(this.$store.state.gdxstationforpark[i][1]);
          }
          break;
        case 3:
          {
            array = findarray(
              this.$store.state.gdGSpiedata,
              this.$store.state.nowparkname
            );
            res = line(this.$store.state.parkgdGSdata[i][1]);

            park = parkparkpointdata(this.$store.state.gdGSstationforpark[i][0]);
            station = parkstationpointdata(this.$store.state.gdGSstationforpark[i][1]);
          }
          break;

        default:
          console.log("error");
      }

      console.log("newid", i);
      console.log(this.$store.state.nowparkname);

      console.log(array);
      let data = getsmallpie(array);
      this.smalloption.series[0].data = data;
      this.smalloption.series[0].name = this.$store.state.nowparkname;
      console.log(data);
      myChart.setOption({
        visualMap: [
          {
            type: "piecewise",
            pieces: [
              { min: 25 },
              { min: 20, max: 25 },
              { min: 15, max: 20 },
              { min: 10, max: 15 },
              { min: 5, max: 10 },
              { min: 0, max: 5 }, // 不指定 min，表示 min 为无限大（-Infinity）。
            ],
            calculable: true,
            inRange: {
              color: ["#6ab92c", "#aed606", "#fef804", "#ff7b00", "#db253e", "#5b1875"],
            },
            seriesIndex: [2, 5],
            right: "30%",
            bottom: "20%",
            backgroundColor: "#ffffff",
          },
          {
            type: "continuous",
            show: false,
            min: 0,
            max: 621,
            calculable: true,
            inRange: {
              symbolSize: [7, 15],
            },
            seriesIndex: [0, 3],
            right: "35%",
            bottom: "20%",
            backgroundColor: "#ffffff",
          },
        ],
        series: [
          {
            name: "匈牙利",
            type: "scatter",
            coordinateSystem: "bmap",
            data: park,
            symbolSize: 10,
            encode: {
              value: 2,
            },

            zlevel: 4,

            itemStyle: {
              color: "red",
            },
          },
          {
            name: "匈牙利",
            type: "scatter",
            coordinateSystem: "bmap",
            data: station,
            symbolSize: 5,
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
            data: res,
            symbol: ["none", "arrow"],
            symbolSize: [0, [8, 20]],
          },
        ],
      });
    },
  },
  computed: {
    nowparkid() {
      return {
        nowparkindex: this.$store.state.nowparkindex,
        nowway: this.$store.state.nowway,
      };
    },
  },
  data() {
    return {
      pie: false,
      smalloption: {
        title: {
          subtext: "车辆信息",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        labelLine: {
          show: false,
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
