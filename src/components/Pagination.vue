<template>
  <div v-if="dataSource.pageTotal > 1"   class="pagination">
    <el-pagination
      v-model:current-page="dataSource.pageNo"
      :page-size="dataSource.pageSize"
      background
      layout="prev, pager, next"
      :total="parseInt(dataSource.totalCount)"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["changePageNo"]);
const props = defineProps({
  dataSource: {
    type: Object,
  },
});
const handleCurrentChange = (pageNo) => {
  props.dataSource.pageNo = pageNo;
  emit("changePageNo");
};
</script>

<style lang="scss" scoped>
.pagination{
  display: flex;
  justify-content: right;
  margin: 8px ;
}
</style>