<template>
  <div class="article-item">
    <div class="article-item-inner">
      <div class="article-body">
        <div class="user-info">
          <Avatar :userId="item.userId" :width="25"></Avatar>
          <el-divider direction="vertical" />
          <router-link :to="'/user/ ' + item.userId" class="a-link">{{
            item.nickName
          }}</router-link>
          <el-divider direction="vertical" />
          <span>
            {{ item.postTime }}&nbsp{{ "·" }}&nbsp
            {{ item.userIpAddress }}
          </span>
          <el-divider direction="vertical" />
          <div v-if="item.pBoardId || item.boardId">
            <router-link to="/" class="a-link" v-if="item.pBoardId">
              {{ item.pBoardName }}
            </router-link>
            <span style="margin: 0px 8px" v-if="item.boardId">/</span>
            <router-link to="/" class="a-link" v-if="item.boardId">
              {{ item.boardName }}
            </router-link>
          </div>
        </div>
        <router-link to="/" class="a-link title">{{ item.title }}</router-link>
        <div class="summary" v-if="item.summary !== null">
          {{ item.summary }}
        </div>
        <div class="article-info">
          <div class="article-info-item">
            <i class="iconfont icon-yanjing"></i>
            <span>{{ item.readCount === 0 ? "阅读" : item.readCount }}</span>
          </div>
          <div class="article-info-item">
            <i class="iconfont icon-dianzan_kuai"></i>
            <span>{{ item.goodCount === 0 ? "点赞" : item.goodCount }}</span>
          </div>
          <div class="article-info-item">
            <i class="iconfont icon-pinglun1"></i>
            <span>{{
              item.commentCount === 0 ? "评论" : item.commentCount
            }}</span>
          </div>
        </div>
      </div>
      <router-link to="/" v-if="item.cover">
        <Cover :width="100" :cover="item.cover"></Cover>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";

import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  data: {
    type: Object,
  },
});
const item = props.data;
</script>

<style lang="scss" scoped>
.article-item {
  padding: 0px 10px;
  .article-item-inner {
    padding: 10px 0px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    .article-body {
      flex: 1;
      .user-info {
        display: flex;
        align-items: center;
        color: #4e5969;
        font-size: 13px;
        .a-link {
          color: #4e5969;
        }
      }
      .title {
        display: inline-block;
        color: black;
        font-size: 16px;
        font-weight: 600;
        color: #4a4a4a;
        margin-top: 10px;
      }
      .summary {
        margin-top: 10px;
        color: #86909c;
        font-size: 14px;
      }
      .article-info {
        display: flex;
        margin-top: 8px;
        .article-info-item {
          margin-right: 25px;
          color: #86909c;
          span {
            display: inline-block;
            margin-left: 5px;
          }
        }
      }
    }
    .cover {
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
.article-item:hover {
  background-color: #fef0f0;
}
</style>