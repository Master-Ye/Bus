<template>
<div ref="paimingtable" style="height:200px;"></div>
</template>

<script>

import * as LineUpJS from 'lineupjs';
import 'lineupjs/build/LineUpJS.css'
export default {
mounted(){

const  table=this.$refs.paimingtable


const arr = [];
const licheng=[0,14190,5540,5540]
const bili=[0,23,9,9]
const cats = ['原始方案', '全局优化', '偏好算法1','偏好算法2'];
for (let i = 0; i < 4; ++i) {
  arr.push({
    方案: cats[i],
    减少空驶里程_km: licheng[i],
    减少空程比例: bili[i],
    改变停车场比例: Math.random() * 10,



  })
}
const builder = LineUpJS.builder(arr);

// manually define columns
builder
.column(LineUpJS.buildCategoricalColumn('方案', cats).color('red'))
  .column(LineUpJS.buildNumberColumn('减少空驶里程_km', [0, 20000]).color('blue'))


  .column(LineUpJS.buildNumberColumn('减少空程比例', [0, 100]).color('blue'))
  .column(LineUpJS.buildNumberColumn('改变停车场比例', [0, 100]).color('blue'))




builder
  .defaultRanking()


const lineup = builder.buildTaggle(table);


}
}
</script>

<style>

</style>