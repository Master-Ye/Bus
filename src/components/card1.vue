<template>
 <div class="q-pa-md row items-start q-gutter-md">


    <q-card class="my-card" flat bordered >
      <q-item>


        <q-item-section>
          <q-item-label class="text-xl font-extrabold">多方案比较</q-item-label>
          <q-item-label caption>
            对各已有方案的各项指数进行比较
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal cols="6">
        <q-card-section>
       <table1 class="relative top-5 right-10"></table1>
       <sandian class="relative left-25"></sandian>
        </q-card-section>

        <q-separator vertical />

        <q-card-section cols="6">
        <comparezhu></comparezhu>
        </q-card-section>
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import comparezhu from "./comparezhu.vue"
import table1 from "./table.vue"
import sandian from "./sandian.vue"
export default {
    components:{
        table1,sandian,comparezhu
    },
data(){
    return {
lorem:" lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
}
}
</script>

<style>
.my-card
  {width: 100%;
  max-width: 1200px;}
</style>