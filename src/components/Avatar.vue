<template>
  <div
    class="avatar"
    :style="{
      width: width + 'px',
      border: none,
      height: width + 'px',
      'border-radius': width / 2 + 'px',
    }"
  >
    <el-image
      v-if="userId"
      :style="{
        width: width + 'px',
        height: width + 'px',
        'border-radius': width / 2 + 'px',
      }"
      :src="proxy.baseConfig.avatarUrl + userId"
      :zoom-rate="1.2"
      fit="scale-down"
      loading='lazy'
      @click="goToUCenter"
    ></el-image>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();

const props = defineProps({
  userId: {
    type: String,
  },
  width: {
    type: Number,
    default: 60,
  },
  addLink: {
    type: Boolean,
    default: true,
  },
});

const goToUCenter = () => {
  if (props.addLink) {
    router.push("/user/", proxy.userId);
  }
};
</script>

<style lang="scss" scoped>
.avatar{
  cursor: pointer;
}
</style>