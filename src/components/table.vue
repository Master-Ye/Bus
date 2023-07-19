<template>
  <div ref="paimingtable" style="height: 200px; width: 680px"></div>
</template>

<script>
import * as LineUpJS from "lineupjs";
import "lineupjs/build/LineUpJS.css";
export default {
  mounted() {
    const table = this.$refs.paimingtable;
    const data = this.$store.state.tableoption;

    const arr = [];
    const licheng = [60687008, 46529978, 55144813, 58747392];
    const lichengdown = [0, 14157030, 5542195, 1939616];
    const bili = [0, 23, 9, 3];
    const parkbili = [0, 58, 49, 6];
    const cats = ["原始方案", "全局优化", "偏好算法1", "偏好算法2"];
    for (let i = 0; i < 4; ++i) {
      arr.push({
        方案: data.cats[i],
        总里程_km: data.licheng[i],
        减少空驶里程_km: data.lichengdown[i],
        减少空程比例: data.bili[i],
        改变停车场比例: data.parkbili[i],
      });
    }

    const builder = LineUpJS.builder(arr);

    // manually define columns
    builder
      .column(LineUpJS.buildCategoricalColumn("方案", data.cats).color("red"))
      .column(LineUpJS.buildNumberColumn("总里程_km", [0, 100000000]).color("blue"))
      .column(LineUpJS.buildNumberColumn("减少空驶里程_km", [0, 20000000]).color("blue"))

      .column(LineUpJS.buildNumberColumn("减少空程比例", [0, 100]).color("blue"))
      .column(LineUpJS.buildNumberColumn("改变停车场比例", [0, 100]).color("blue"));

    builder.defaultRanking();

    const lineup = builder.buildTaggle(table);
  },
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
