<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { TEngine } from "./assets/ts/TEngine";

export default defineComponent({
  setup() {
    const threeTarget = ref(null);
    


    onMounted(()=>{
      const TE = new TEngine(threeTarget.value!)
    })

    return{
      threeTarget,
    }
  },
})
</script>





<style>
.three-canvas{
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
