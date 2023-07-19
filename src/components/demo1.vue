<template>
  <div style="overflow:hidden;" class="relative left-20">
    <div class="q-pa-md relative left-120 bottom-0 z-50 w-100">
      <div class="q-gutter-sm">
        <q-radio v-model="value" val="1" label="城市停车分配" />
        <q-radio v-model="value" val="2" label="停车场车队占比" />
      </div>
    </div>

    <!--    <div class="q-pa-md fixed left-2 p-0 top-10">
      <div>已有方案：</div>
  <q-option-group :options="optionsone" type="radio" v-model="group" />
    </div>-->

    <div class="flex justify-between left-20 relative bottom-30">
      <div id="main" style="width: 1200px; height: 700px" class="main mt-0">

      </div>

    </div>
  </div>
</template>

<script>

import parkparkpointdata from "../utils/parkparkpointdata.js";
import line from "../utils/line.js";
import parkstationpointdata from "../utils/parkstationpointdata.js";
import findarray from "../utils/findArray";
import "echarts/extension/bmap/bmap";
import * as echarts from "echarts";
export default {
  watch:{
    group(newgroup) {
if(this.value==2&&newgroup!=1){
  this.tuli=true
}
else{
  this.tuli=false
}
      this.$store.state.nowway = newgroup;
      if (this.group == 1) {
        if (this.value == 1) {
          this.go1(11);
        }
        if (this.value == 2) {
          this.go2(21);
        }
        this.$store.state.truewm = this.$store.state.rawwm;
        this.nowmethods = 1;
      }
      if (this.group == 2) {
        this.$store.state.truewm = this.$store.state.gdxwm;
        if (this.value == 1) {
          this.go1(12);
        }
        if (this.value == 2) {
          this.go2(22);
        }
        this.nowmethods = 2;

      }
      if (this.group == 3) {

        if (this.value == 1) {
          this.go1(13);
        }
        if (this.value == 2) {
          this.go2(23);
        }
        this.nowmethods = 3;
        this.$store.state.truewm = this.$store.state.GSwm;
      }
      if (this.group == 4) {
        this.$store.state.truewm = this.$store.state.GS2wm;
        if (this.value == 1) {
          this.go1(14);
        }
        if (this.value == 2) {
          this.go2(24);
        }
        this.nowmethods = 4;

      }
    },
    value(newvalue) {
      if(newvalue==2&&this.group!=1)
{
this.tuli=true
}
else{
  this.tuli=false
}
      const concatenatedStr = newvalue.toString() + this.group;
      const result = parseInt(concatenatedStr);
      if (this.value == 1) {
        this.go1(result);
      }
      if (this.value == 2) {
        this.go2(result);
      }
    },
  },
  computed: {
    group(){
return this.$store.state.group
    },

    parkpointdata() {
      var res = [];
      for (var i = 0; i < this.$store.state.parkcapacity.length; i++) {
        res.push({
          name: this.$store.state.parkcapacity[i][1],
          value: this.$store.state.parkcapacity[i][0].concat(
            this.$store.state.parkcapacity[i][2]
          ),
        });
      }
      return res;
    },
    stationpointdata() {
      var res = [];
      for (var i = 0; i < this.$store.state.stationdata.length; i++) {
        res.push({
          name: this.$store.state.stationdata[i][1],
          value: this.$store.state.stationdata[i][0],
        });
      }
      return res;
    },
    rawparkpointdata() {
      var res = [];
      for (var i = 0; i < this.$store.state.rawparkdata.length; i++) {
        res.push({
          name: this.$store.state.rawparkdata[i][1],
          value: this.$store.state.rawparkdata[i][0].concat(
            this.$store.state.rawparkdata[i][2]
          ),
        });
      }
      return res;
    },
    rawstationpointdata() {
      var res = [];
      for (var i = 0; i < this.$store.state.rawstationdata.length; i++) {
        res.push({
          name: this.$store.state.rawstationdata[i][1],
          value: this.$store.state.rawstationdata[i][0],
        });
      }
      return res;
    },
  },
  mounted() {
    var res = [];
    for (var i = 0; i < this.$store.state.rawdata.length; i++) {
      res.push({
        coords: [this.$store.state.rawdata[i][0], this.$store.state.rawdata[i][2]],
        name: this.$store.state.rawdata[i][1] + "——" + this.$store.state.rawdata[i][3],
        value: this.$store.state.rawdata[i][4],
        lineStyle: {
          width: this.$store.state.rawdata[i][4] / 25 + 1.2,
          opacity: this.$store.state.rawdata[i][4] / 25 + 0.3,
          curveness: 0.2,
        },
      });
    }
    this.rawdata1 = res;
    var res = [];
    for (var i = 0; i < this.$store.state.gdGSdata.length; i++) {
      res.push({
        coords: [this.$store.state.gdGSdata[i][0], this.$store.state.gdGSdata[i][2]],
        name: this.$store.state.gdGSdata[i][1] + "——" + this.$store.state.gdGSdata[i][3],
        value: this.$store.state.gdGSdata[i][4],
        lineStyle: {
          width: this.$store.state.gdGSdata[i][4] / 25 + 1.2,
          opacity: this.$store.state.gdGSdata[i][4] / 25 + 0.3,
          curveness: 0.2,
        },
      });
    }

    this.gdGSdata1 = res;
      var res = [];
    for (var i = 0; i < this.$store.state.gdGS2data.length; i++) {
      res.push({
        coords: [this.$store.state.gdGS2data[i][0], this.$store.state.gdGS2data[i][2]],
        name: this.$store.state.gdGS2data[i][1] + "——" + this.$store.state.gdGS2data[i][3],
        value: this.$store.state.gdGS2data[i][4],
        lineStyle: {
          width: this.$store.state.gdGS2data[i][4] / 25 + 1.2,
          opacity: this.$store.state.gdGS2data[i][4] / 25 + 0.3,
          curveness: 0.2,
        },
      });
    }

    this.gdGS2data1 = res;
    var res = [];
    for (var i = 0; i < this.$store.state.gdxdata.length; i++) {
      res.push({
        coords: [this.$store.state.gdxdata[i][0], this.$store.state.gdxdata[i][2]],
        name: this.$store.state.gdxdata[i][1] + "——" + this.$store.state.gdxdata[i][3],
        value: this.$store.state.gdxdata[i][4],
        lineStyle: {
          width: this.$store.state.gdxdata[i][4] / 25 + 1.2,
          opacity: this.$store.state.gdxdata[i][4] / 25 + 0.3,
          curveness: 0.2,
        },
      });
    }
    this.gdxdata1 = res;

    let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
    this.centerCity = centerCity;
    var myChart = echarts.init(document.getElementById("main"));
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
    console.log(heatmap_C_1.getCenter());
    myChart.on("click", this.handleClick);

    heatmap_C_1.disableScrollWheelZoom()
  },
  methods: {
    changeZhu(value) {},
    handleClick(params) {
      console.log(params.dataIndex);
      if (this.suo == false) {
        this.$store.state.nowparkname = params.name;
        let station = [];
        let park = [];
        let res = [];

        var myChart = echarts.init(document.getElementById("main"));
        var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();

        const center = heatmap_C_1.getCenter();
        var currentZoom = heatmap_C_1.getZoom();
        let i = params.dataIndex;
        if (i == null) return;
        let array = [];
        let j = this.nowmethods;
        myChart.clear();
        var option = {
          bmap: {
            center: [center.lng, center.lat], //  中心点
            zoom: currentZoom, //  放大倍数
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
            case 4:
            {
              array = findarray(
                this.$store.state.GS2piedata,
                this.$store.state.nowparkname
              );
              res = line(this.$store.state.parkGS2data[i][1]);

              park = parkparkpointdata(this.$store.state.gdGS2stationforpark[i][0]);
              station = parkstationpointdata(this.$store.state.gdGS2stationforpark[i][1]);
            }
            break;

          default:
            console.log(j,"error");
        }

        console.log("newid", i);
        console.log(this.$store.state.nowparkname);

        this.suo = true;

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
        var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
    heatmap_C_1.addControl(new BMap.NavigationControl());
    heatmap_C_1.disableScrollWheelZoom()
      } else {
        this.suo = false;
        var myChart = echarts.init(document.getElementById("main"));

        var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
        var currentZoom = heatmap_C_1.getZoom();
        const center1 = heatmap_C_1.getCenter();
        const concatenatedStr = "1" + this.group.toString();
        const center={
zoom:currentZoom,
center:center1
        }
        // 将拼接后的字符串转换为数字
        const result = parseInt(concatenatedStr);
        this.go1(result, center);
      }
    },
    handleClick1(params) {
      console.log(params.seriesName);
    },
    go2(value) {
      console.log(value);
      let piedata = [];
      let piedata1 = [];
      switch (value) {
        case 21:
          {piedata = this.$store.state.rawpiedata;
            }

          break;
        case 22:
          {piedata = this.$store.state.gdxpiedata;
piedata1=this.$store.state.gdxpiedata1;
          }
          break;
        case 23:
         { piedata = this.$store.state.gdGSpiedata;
piedata1=this.$store.state.gdGSpiedata1;}
          break;
          case 24:
         { piedata = this.$store.state.GS2piedata;
piedata1=this.$store.state.gdGS1piedata1;}
          break;
        default:
          console.log("error");
      }
      let res = [];
      let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
      var myChart = echarts.init(document.getElementById("main"));
      myChart.clear();


      if(piedata1.length!=0){
      for(var i =0;i<piedata1.length;i++){
				let temp = {
					center: piedata1[i][0],
				 color:["#94ca72","#546fc6"],
					coordinateSystem: 'bmap',
					data: [
						{name: 'Bus unchanged', value: piedata1[i][2]},
						{name: 'Bus changed', value: piedata1[i][3]}
					],
					label:{
						show: false
					},
					name: piedata1[i][1]+'('+(piedata1[i][2]+piedata1[i][3]).toString()+')',
					radius: (piedata1[i][2]+piedata1[i][3]-1)/(621-1)*10+5,
					type: 'pie'
				}

				res.push(temp)}
        for(var i =0;i<piedata1.length;i++){
				let temp = {
					center: piedata1[i][0],
				 color:"white",
					coordinateSystem: 'bmap',
					data: [
						{name: '', value:1},

					],
          tooltip: {
    show: false
  },
					label:{
						show: false
					},
					name: piedata1[i][1]+'('+(piedata1[i][2]+piedata1[i][3]).toString()+')',
					radius: [(piedata1[i][2]+piedata1[i][3]-1)/(621-1)*10+5,(piedata1[i][2]+piedata1[i][3]-1)/(621-1)*10+6],
					type: 'pie'
				}

				res.push(temp)}
      }

        for (var i = 0; i < piedata.length; i++) {
        var data = [];
        for (var j = 2; j < piedata[i].length; j++) {
          data.push({
            name: piedata[i][j][0],
            value: piedata[i][j][1],
          });
        }
        let temp = {
          color: [
            "#fac858",
          "#F72C5B",
          "#9a60b4",
          "#73c0de",
          "#ff84c1",
          "#fd7f52",


          "#3ba272",


        ],
          center: piedata[i][0],
          coordinateSystem: "bmap",
          data: data,
          label: {
            show: false,
          },
          name:
            piedata[i][1] +
            "(" +
            this.$store.state.rawparkcapacity[i][2].toString() +
            ")",
          radius: piedata1.length==0?((this.$store.state.rawparkcapacity[i][2] - 1) / (621 - 1)) * 10 + 7:[(piedata1[i][2]+piedata1[i][3]-1)/(621-1)*10+6,((piedata1[i][2]+piedata1[i][3]-1)/(621-1)*10+5+((this.$store.state.rawparkcapacity[i][2] - 1) / (621 - 1)) * 10 + 7)/1.2],
          type: "pie",
        };
        res.push(temp);

      }
      let option = {


        bmap: {
          center: [centerCity.lng, centerCity.lat], // 设置地图中心点
          zoom: 12, // 设置地图层级
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
        legend: [{
          data: ["Bus changed", "Bus unchanged"],
          backgroundColor: '#fff',
          orient: "vertical",
          right: "10%",
          bottom:"26%",
          itemStyle: {
            borderColor: 'transparent',
          },
          textStyle: {
            fontSize: 15,

          },

        },
      {
        data:["Branch 1","Branch 2","Branch  3","Trolley Branch","Branch  5","Branch  6","Qiantang Branch"] ,
        backgroundColor: '#fff',
          orient: "vertical",
          right: "25%",
          itemStyle: {
            borderColor: 'transparent',
          },
          textStyle: {
            fontSize: 15,

          },
bottom:"8%"
      }],
        tooltip: {
          show: true,
        },
        series: res, // 饼图数据列
      };
      myChart.setOption(option);
      var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
    heatmap_C_1.addControl(new BMap.NavigationControl());
    heatmap_C_1.disableScrollWheelZoom()
    },
    go1(value, center) {
      this.changeZhu(value);
      let stationpointdata = [];
      let parkpointdata = [];
      let linedata = [];
      switch (value) {
        case 11:
          {
            linedata = this.rawdata1;
            parkpointdata = this.rawparkpointdata;
            stationpointdata = this.rawstationpointdata;
          }
          break;
        case 12:
          {
            linedata = this.gdxdata1;
            parkpointdata = this.parkpointdata;
            stationpointdata = this.stationpointdata;
          }
          break;

        case 13:
          {
            linedata = this.gdGSdata1;
            parkpointdata = this.parkpointdata;
            stationpointdata = this.stationpointdata;
          }
          break;
          case 14:
          {
            linedata = this.gdGS2data1;
            parkpointdata = this.parkpointdata;
            stationpointdata = this.stationpointdata;
          }
          break;
        default:
          console.log(10); // 如果没有与表达式相同的值，则执行该代码
      }
      let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
      var myChart = echarts.init(document.getElementById("main"));
      console.log(linedata);
      myChart.clear();
      if (center) {
        myChart.setOption({
          bmap: {
            center: [center.center.lng, center.center.lat], //  中心点
            zoom: center.zoom, //  放大倍数
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
                color: ["#6ab92c", "#fef100", "#ffc000", "#ff7b00", "#db253e", "#5b1875"],
              },
              seriesIndex: [2, 5],
              right: "35%",
              bottom: "20%",
              backgroundColor: "#ffffff",
            },
            {
              type: "continuous",
              show: false,
              min: 0,
              max: 429,
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
              data: parkpointdata,
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
              data: stationpointdata,
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
              data: linedata,
              symbol: ["none", "arrow"],
              symbolSize: [0, [8, 20]],
            },
          ],
        });
        return;
      }
      myChart.setOption({
        bmap: {
          center: [centerCity.lng+0.05, centerCity.lat], //  中心点
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
              color: ["#6ab92c", "#fef100", "#ffc000", "#ff7b00", "#db253e", "#5b1875"],
            },
            seriesIndex: [2, 5],
            right: "20%",
            bottom: "10%",
            backgroundColor: "#ffffff",
          },
          {
            type: "continuous",
            show: false,
            min: 0,
            max: 429,
            calculable: true,
            inRange: {
              symbolSize: [7, 15],
            },
            seriesIndex: [0, 3],
            left: "8%",
            top: "10%",
            backgroundColor: "#ffffff",
          },
        ],
        series: [
          {
            name: "匈牙利",
            type: "scatter",
            coordinateSystem: "bmap",
            data: parkpointdata,
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
            data: stationpointdata,
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
            data: linedata,
            symbol: ["none", "arrow"],
            symbolSize: [0, [8, 20]],
          },
        ],
      });
      var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
    heatmap_C_1.addControl(new BMap.NavigationControl());
    heatmap_C_1.disableScrollWheelZoom()
    heatmap_C_1.addEventListener("dragend", function() {
  // 在拖拽结束时重新启用鼠标滚轮缩放
  heatmap_C_1.disableScrollWheelZoom();
});
    },
    go3(value1, value2) {
      this.changeZhu(value2);
      let station = [];
      let park = [];
      let res = [];
      let centerCity = mapv.utilCityCenter.getCenterByCityName("杭州");
      var myChart = echarts.init(document.getElementById("main"));
      let i = removefirst(value1);
      myChart.clear();

      switch (value2) {
        case 1:
          {
            res = line(this.$store.state.parkrawdata[i][1]);

            park = parkparkpointdata(this.$store.state.rawstationforpark[i][0]);
            station = parkstationpointdata(this.$store.state.rawstationforpark[i][1]);
          }
          break;
        case 2:
          {
            res = line(this.$store.state.parkgdxdata[i][1]);

            park = parkparkpointdata(this.$store.state.gdxstationforpark[i][0]);
            station = parkstationpointdata(this.$store.state.gdxstationforpark[i][1]);
          }
          break;
        case 3:
          {
            res = line(this.$store.state.parkgdGSdata[i][1]);

            park = parkparkpointdata(this.$store.state.gdGSstationforpark[i][0]);
            station = parkstationpointdata(this.$store.state.gdGSstationforpark[i][1]);
          }
          break;

        default:
          console.log("error");
      }

      console.log(res);

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
      var heatmap_C_1 = myChart.getModel().getComponent("bmap").getBMap();
    heatmap_C_1.addControl(new BMap.NavigationControl());
    heatmap_C_1.disableScrollWheelZoom()
    },
    handleChange(value) {
      console.log(value[0], value[1], value[2]);
      switch (value[0]) {
        case 1:
          this.go1(value[1]);
          break;
        case 2:
          this.go2(value[1]); // 当表达式的结果等于 value2 时，则执行该代码
          break;
        case 3:
          this.go3(value[1], value[2]); // 当表达式的结果等于 value3 时，则执行该代码
          break;
        case 21:
          this.go21(); // 当表达式的结果等于 value1 时，则执行该代码
          break;
        case 22:
          this.go22(); // 当表达式的结果等于 value2 时，则执行该代码
          break;
        case 23:
          this.go23();
          break;
        default:
          console.log("error");
      }
    },
  },
  data() {
    return {


      gdGS2data1:"",
      suo: false,
      color: "real",
      nowmethods: "",


      excep: [],
      value: "",
      value1: "",
      value2: "",
      options11: [
        {
          value: "全部路线算法",
          label: "全部路线算法",
        },
        {
          value: "自定义保留路线",
          label: "自定义保留路线",
        },
      ],
      opp: { expandTrigger: "hover" },
      option: "",
      centerCity: "",
      gdGSdata1: [],
      rawdata1: [],
      gdxdata1: [],
      options: [
        {
          value: 1,
          label: "城市停车分配",
          children: [
            {
              value: 11,
              label: "原始数据",
            },
            {
              value: 12,
              label: "匈牙利算法数据-高德",
            },
            {
              value: 13,
              label: "偏好算法数据-高德",
            },
          ],
        },
        {
          value: 2,
          label: "停车场车队占比",
          children: [
            {
              value: 21,
              label: "原始数据",
            },
            {
              value: 22,
              label: "匈牙利算法数据-高德",
            },
            {
              value: 23,
              label: "偏好算法数据-高德",
            },
          ],
        },
        {
          value: 3,
          label: "停车场停车分配",
          children: [
            {
              value: 31,
              label: "阮家桥公交停车场(582)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 32,
              label: "九和路公交停车场(511)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 33,
              label: "三墩公交停保基地(462) ",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 34,
              label: "石桥公交停车场(449) ",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 35,
              label: "石塘公交停车场(420)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 36,
              label: "转塘公交停车场(279)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 37,
              label: "浦沿公交停车场(272)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 38,
              label: "七堡公交停车场(240)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 39,
              label: "之江公交停车场(127)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 310,
              label: "下沙公交停保基地(103)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },

            {
              value: 311,
              label: "池华街公交站(58)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 313,
              label: "学源街公交停车场(52)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 314,
              label: "振华路公交停车场(39)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 315,
              label: "天都城公交站(21)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },

            {
              value: 316,
              label: "浦沿公交停车场西(21)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 317,
              label: "丁桥公交站(20)",
              children: [
                {
                  value: 1,
                  label: "原始数据",
                },
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
          ],
        },
      ],
      options12: [
        {
          value: 1,
          label: "城市停车分配",
          children: [
            {
              value: 12,
              label: "匈牙利算法数据-高德",
            },
            {
              value: 13,
              label: "偏好算法数据-高德",
            },
          ],
        },
        {
          value: 2,
          label: "停车场车队占比",
          children: [
            {
              value: 22,
              label: "匈牙利算法数据-高德",
            },
            {
              value: 23,
              label: "偏好算法数据-高德",
            },
          ],
        },
        {
          value: 3,
          label: "停车场停车分配",
          children: [
            {
              value: 31,
              label: "阮家桥公交停车场(582)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 32,
              label: "九和路公交停车场(511)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 33,
              label: "三墩公交停保基地(462) ",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 34,
              label: "石桥公交停车场(449) ",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 35,
              label: "石塘公交停车场(420)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 36,
              label: "转塘公交停车场(279)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 37,
              label: "浦沿公交停车场(272)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 38,
              label: "七堡公交停车场(240)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 39,
              label: "之江公交停车场(127)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 310,
              label: "下沙公交停保基地(103)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },

            {
              value: 311,
              label: "池华街公交站(58)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 313,
              label: "学源街公交停车场(52)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 314,
              label: "振华路公交停车场(39)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 315,
              label: "天都城公交站(21)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },

            {
              value: 316,
              label: "浦沿公交停车场西(21)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
            {
              value: 317,
              label: "丁桥公交站(20)",
              children: [
                {
                  value: 2,
                  label: "匈牙利算法数据-高德",
                },
                {
                  value: 3,
                  label: "偏好算法数据-高德",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.main {
  position: relative;
  top: 100px;
}
.main1 {
  position: fixed;
  top: 100px;
  right: 10px;
}
</style>
