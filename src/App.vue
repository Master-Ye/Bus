<script setup>
import side from "./components/side.vue";
</script>

<template>
  <div>
    <side></side>

    <router-view v-slot="{ Component }">
      <keep-alive include="Setting">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped>
.demo1 {
  position: relative;
}
.demo2 {
  position: fixed;
  left: 0px;
}
</style>
