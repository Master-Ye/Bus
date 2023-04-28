<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 1500px; width: 400px;overflow:hidden;"
    class="absolute left-0 top-0 "
  >
    <template v-slot:before>
      <q-tabs v-model="group" vertical class="bg-grey-2" align="center">
        <q-tab
          v-for="item in optionsone"
          :key="item.value"
          :name="item.value"
          :label="item.label"
          :icon="item.icon"
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
    return {
      optionsone: [
        { label: "历史方案", value: 0, disable:true},
        { label: "原始方案", value: 1, class: "text-cyan", icon: "trip_origin" },
        { label: "全局优化方案", value: 2, class: "text-red", icon: "check_circle" },
        { label: "考虑偏好方案1", value: 3, class: "text-blue", icon: "favorite" },
        { label: "考虑偏好方案2", value: 4, class: "text-blue", icon: "favorite" },
        { label: "预设条件", value: 0, disable:true},
        { label: "新建方案", value: 5, class: "text-orange", icon: "add_circle_outline" },
        { label: "方案比较", value: 0, disable:true},
        { label: "不同方案比较", value: 6, class: "text-teal", icon: "view_list" },

      ],
      group: null,
    };
  },
  watch: {
    group(newgroup,oldgroup) {
      this.$store.state.group = newgroup;

    },

    newway(newvalue){
      let tem={ label: newvalue[0], value: 7, class: "text-purple", icon: "manage_accounts" }
this.optionsone.splice(5, 0, tem);
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

<style></style>
