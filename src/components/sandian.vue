<template>
  <v-chart :option="options" style="height: 300px; width: 300px" autoresize></v-chart>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    options() {
      return this.$store.state.sandianoption;
    },
  },
};
</script>

<style>
.chart {
  height: 300px;
}
</style>
