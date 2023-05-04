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

      <q-card-section horizontal >
        <q-card-section>
       <table1 class="relative bottom-70 right-10 inline-block"></table1>
       <sandian class="relative left-20 inline-block bottom-10"></sandian>


        <comparezhu class="relative bottom-72 left-70"></comparezhu>  </q-card-section>
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