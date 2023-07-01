<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="title"
    :width="width"
    :draggable="draggable"
    :close-on-click-modal="closeOnClickModal"
    :show-close="showClose"
    :top="top"
    class="dialog"
    closed="close"
  >
    <div class="dialog-body">
      <slot></slot>
    </div>
    <div
      v-if="(buttons && buttons.length > 0) || showCancel"
      class="dialog-footer"
    >
      <el-button link v-if="showCancel" @click="close">取消</el-button>
      <el-button
        v-for="btn in buttons"
        :key="btn.text"
        :type="btn.type"
        @click="btn.click"
        >{{ btn.text }}</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "标题",
  },
  width: {
    type: String,
    default: "400px",
  },
  top: {
    type: String,
    default: "50px",
  },
  // 是否可以拖动
  draggable: {
    type: Boolean,
    default: true,
  },
  // 是否可以点击空白关闭
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  // 是否显示头部关闭按钮
  showClose: {
    type: Boolean,
    default: true,
  },
  // 是否显示取消按钮
  showCancel: {
    type: Boolean,
    default: true,
  },
  buttons: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits();
const close = () => {
  emit("close");
};
</script>

<style lang="scss" >
.dialog {
  margin-bottom: 10px;
  .el-dialog__header {
    margin-right: 0px;
  }
  .el-dialog__body {
    padding: 0px;
    .dialog-body {
      min-height: 100px;
      padding: 15px;
      max-height: calc(100vh - 200px);
      overflow: auto;
    }
    .dialog-body::-webkit-scrollbar {
      /* 对应纵向滚动条的宽度 */
      width: 6px;
      /* 对应横向滚动条的宽度 */
      height: 6px;
    }

    /* 滚动条上的滚动滑块 */
    .dialog-body::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }

    /* 滚动条轨道 */
    .dialog-body::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    .dialog-footer {
      text-align: right;
      padding: 5px;
    }
  }
}
</style>