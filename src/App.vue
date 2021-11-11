<template>

    <div id="info">
      xiangxun
      <a href="https://github.com/xiangxun/threeVue" target="_blank" rel="noopener">github</a>
      /
      <a href="https://space.bilibili.com/314030602" target="_blank" rel="noopener">bilibili</a>
    </div>


  <div class="three-canvas" ref="threeTarget">



  </div>
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
