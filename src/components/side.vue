<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 1500px; width: 400px;overflow:hidden;"
    class="fixed left-0 top-0 "
  >
    <template v-slot:before>
      <q-tabs v-model="group" vertical class="bg-grey-2" align="center" style="width:130px;">
        <q-tab
          v-for="item in optionsone"
          :key="item.value"
          :name="item.value"
          :label="item.label"
 :style="item.style"
          :class="item.class"
          :disable="item.disable"
          @click="push(item.value)"

        />
      </q-tabs>
    </template>
  </q-splitter>
</template>

<script>
export default {
  data() {
    return {index1:7,
      index2:5,
      optionsone: [
        { label: "历史方案", value: 0, disable:true},
        { label: "原始方案", value: 1, class: " square1", icon: "trip_origin" },
        { label: "全局优化方案", value: 2, class: "square2", icon: "check_circle" },
        { label: "考虑偏好方案1", value: 3, class: "square3", icon: "favorite" },
        { label: "考虑偏好方案2", value: 4, class: "square4", icon: "favorite",style:" border-bottom: 1px solid black;" },
        { label: "预设条件", value: 0, disable:true},
        { label: "新建方案", value: 5, class: "", icon: "add_circle_outline", style:" border-bottom: 1px solid black;"},
        { label: "方案比较", value: 0, disable:true},
        { label: "不同方案比较", value: 6, class: "", icon: "view_list",style:" border-bottom: 1px solid black;" },

      ],
      group: null,
    };
  },
  watch: {
    group(newgroup,oldgroup) {
      this.$store.state.group = newgroup;

    },

    newway(newvalue){
      let temp=this.index1
      this.optionsone[this.index2-1].style=""
let classtemp="square"+this.index2
console.log(classtemp)
      let tem={ label: newvalue.name, value: temp, style:" border-bottom: 1px solid black;",class:classtemp }
this.index1++;
this.optionsone.splice(this.index2, 0, tem);
this.index2++
    }
  },
  computed:{
newway(){
  return this.$store.state.newway
},
},
methods:{
  push(value){
if(value==6)
{
  this.$router.push("/compare")
}
if(value==5)
{
  this.$router.push("/setting");
}
if(value>0&&value<5)
{
  this.$router.push("/");
}
  },

}};
</script>

<style>

.square1::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #195ea9;
  margin-right: 5px;
}
.square2::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ff7f0e;
  margin-right: 5px;
}
.square3::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #2ca02c;
  margin-right: 5px;
}
.square4::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #d62728;
  margin-right: 5px;
}
.square5::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: pink;
  margin-right: 5px;
}
.square6::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: purple;
  margin-right: 5px;
}
.square7::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #FF00FF;
  margin-right: 5px;
}
</style>
