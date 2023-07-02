<template>
  <div class="body-content">
    <div
      :style="{ width: proxy.baseConfig.layoutWidth + 'px' }"
      class="article-content"
    >
      <div class="content-header">
        <div
          :class="['tab', orderType === 0 ? 'active' : '']"
          @click="changeOrderType(0)"
        >
          热榜
        </div>
        <el-divider direction="vertical" />
        <div
          :class="['tab', orderType === 1 ? 'active' : '']"
          @click="changeOrderType(1)"
        >
          发布时间
        </div>
        <el-divider direction="vertical" />
        <div
          :class="['tab', orderType === 2 ? 'active' : '']"
          @click="changeOrderType(2)"
        >
          最新
        </div>
      </div>
      <el-skeleton :rows="5" animated v-if="loading" />
      <div v-else>
        <el-empty description="暂无数据" v-if="isEmpty" />
        <div v-else>
          <div class="article-item">
            <ArticleItem
              v-for="item in articleList.list"
              :key="item.articleId"
              :data="item"
            >
            </ArticleItem>
          </div>
          <Pagination
            class="pagination"
            :dataSource="articleList"
            @changePageNo="getArticleList"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArticleItem from "@/views/articleList/ArticleItem.vue";

import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const loading = ref();
const isEmpty = ref(false);

const orderType = ref(0);
const changeOrderType = (type) => {
  orderType.value = type;
  getArticleList();
};

const api = {
  article: "/forum/loadArticle",
};
const articleList = ref({
  pageNo: 1,
});
const getArticleList = async () => {
  loading.value = true;
  const params = {
    pageNo: articleList.value.pageNo,
    boardId: 0,
    orderType: orderType.value,
  };
  let result = await proxy.Request({
    url: api.article,
    params: params,
  });
  loading.value = false;
  if (!result) {
    isEmpty.value = true;
    return;
  }
  articleList.value = result.data;
};
getArticleList();
</script>

<style lang="scss" scoped>
.body-content {
  margin-top: 60px;
  position: relative;
  background-color: #ddd;
  height: 100%;
  .article-content {
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    min-height: 100vh;
    position: relative;
    .content-header {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .tab {
        cursor: pointer;
      }
    }
  }
}
.active {
  color: #007fff;
  cursor: pointer;
}
</style>