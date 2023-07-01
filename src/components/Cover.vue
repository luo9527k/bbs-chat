<!--
 * @Author: SatanYoung amgyjl0926@163.com
 * @Date: 2023-04-20 15:05:53
 * @LastEditors: SatanYoung amgyjl0926@163.com
 * @LastEditTime: 2023-04-20 16:48:48
 * @FilePath: \easybbs-web\src\components\Cover.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="cover" :style="{ width: width + 'px', height: width + 'px' }">
    <el-image
      :src="proxy.baseConfig.coverUrl + cover"
      :style="{ width: width + 'px', height: width + 'px' }"
      fit="scale-down"
      loading="lazy"
    ></el-image>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  width: {
    type: Number,
    default: 100,
  },
  cover: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
.cover {
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
}
</style>