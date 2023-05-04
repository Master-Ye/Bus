<template>

  <q-splitter
    v-model="splitterModel"
    style="height: 1500px; width: 400px;overflow:hidden;"
    class="fixed left-0 top-0 m-0"
    align="left"
  >
    <template v-slot:before>
      <q-tabs v-model="group" vertical class="bg-grey-2 text-left " align="left" style="width:222px;">
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
        { label: "Scheme list", value: 0, disable:true,style:"text-align:left;" ,contentClass:"text-base "},
        { label: "Original scheme", value: 1, class: " square1 " ,style:"justify-content: flex-start;" },
        { label: "Global optimization scheme", value: 2, class: "square2", icon: "check_circle",style:"justify-content: flex-start;" },
        { label: "Preference scheme 1", value: 3, class: "square3", icon: "favorite",style:"justify-content: flex-start;" },
        { label: "Preference scheme 2", value: 4, class: "square4", icon: "favorite",style:" ",style:"justify-content: flex-start;" },
        { label: "Precondition list", value: 0, disable:true,style:"  border-top: 1px solid black;"},
        { label: "New scheme", value: 5, class: "", icon: "add_circle_outline", style:" border-bottom: 1px solid black;border-top: 1px solid black;"},

        { label: "Compare schemes", value: 6, class: "", icon: "view_list",style:" border-bottom: 1px solid black;" },

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
