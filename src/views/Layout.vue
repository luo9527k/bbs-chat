<template>
  <div class="header" v-if="showHeader">
    <div
      class="header-content"
      :style="{ width: proxy.baseConfig.layoutWidth + 'px' }"
    >
      <div class="header-title">
        <router-link to="/" class="logo">
          <img src="../assets/title.png">
        </router-link>
      </div>
      <div class="menu-plane">
        <a href="javascript:void(0)">首页</a>
        <div v-for="boardItem in boardList" class="father-item">
          <el-popover
            placement="bottom-start"
            :width="200"
            trigger="hover"
            v-if="boardItem.children.length > 0"
          >
            <template #reference>
              <a href="javascript:void(0)">{{ boardItem.boardName }}</a>
            </template>
            <div class="sub-board-list">
              <a
                href="javascript:void(0)"
                class="sub-board"
                v-for="sonItem in boardItem.children"
              >
                {{ sonItem.boardName }}
              </a>
            </div>
          </el-popover>
          <a href="javascript:void(0)" v-else>{{ boardItem.boardName }}</a>
        </div>
      </div>
      <div class="user-info-plane">
        <el-button type="primary">
          搜索
          <i class="iconfont icon-sousuo"></i>
        </el-button>
        <el-button type="primary">
          发帖
          <i class="iconfont icon-jiahao"></i>
        </el-button>

        <!-- 显示用户信息 -->
        <div class="info-plane" v-if="userInfo.userId">
          <div class="message-info">
            <el-dropdown>
              <el-badge :value="sumCount">
                <div class="iconfont icon-lingdang"></div>
              </el-badge>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-badge :value="answerMeCount" class="item">
                      回复我的
                    </el-badge>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-badge :value="likeMyArticleCount" class="item">
                      赞了我的文章
                    </el-badge>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-badge :value="downloadMyAttachmentCount" class="item">
                      下载了我的附件
                    </el-badge>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-badge :value="likeMyCommentCount" class="item">
                      赞了我的评论
                    </el-badge>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-badge :value="systemMessageCount" class="item">
                      系统消息
                    </el-badge>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="user-info">
            <el-dropdown>
              <Avatar :width="50" :userId="userInfo.userId"></Avatar>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <el-button-group v-else>
          <el-button type="primary" plain @click="loginAndRegistration(1)"
            >登录</el-button
          >
          <el-button type="primary" plain @click="loginAndRegistration(0)"
            >注册</el-button
          >
        </el-button-group>
      </div>
    </div>
  </div>
  <LoginAndRegistration ref="loginRegisterRef"></LoginAndRegistration>
  <router-view/>
</template>

<script setup>
import LoginAndRegistration from "./LoginAndRegistration.vue";
import {
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  computed,
  watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();

const api = {
  getUserInfo: "/getUserInfo",
  loadBoard: "/board/loadBoard",
};

const answerMeCount = ref(1);
const likeMyArticleCount = ref(1);
const downloadMyAttachmentCount = ref(1);
const likeMyCommentCount = ref(1);
const systemMessageCount = ref(1);

const sumCount = computed(() => {
  return (
    answerMeCount.value +
    likeMyArticleCount.value +
    downloadMyAttachmentCount.value +
    likeMyCommentCount.value +
    systemMessageCount.value
  );
});

// 是否显示头部导航栏
const showHeader = ref(true);
// 获取滚动条高度
const getScrollTop = () => {
  let scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  return scrollTop;
};
const initScroll = () => {
  let scrollTop = getScrollTop();
  let scrollType = 0;
  window.addEventListener("scroll", () => {
    const currentScrollTop = getScrollTop();
    if (scrollTop < currentScrollTop) {
      // 向下滚动
      scrollType = 0;
    } else {
      scrollType = 1;
    }
    if (scrollType === 0 && currentScrollTop > 200) {
      showHeader.value = false;
    } else {
      showHeader.value = true;
    }
    scrollTop = currentScrollTop;
  });
};

const loginRegisterRef = ref();
const loginAndRegistration = (type) => {
  loginRegisterRef.value.showPanel(type);
};

// 获取面板信息
const boardList = ref([]);
const getBoardList = async () => {
  let result = await proxy.Request({
    url: api.loadBoard,
  });
  if (!result) {
    return;
  }
  boardList.value = result.data;
};

onMounted(() => {
  initScroll();
  getUserInfo();
  getBoardList();
});

// 获取用户信息
const getUserInfo = async () => {
  let result = await proxy.Request({
    url: api.getUserInfo,
  });
  if (!result) {
    return;
  }
  store.commit("updateLoginUserInfo", result.data);
};

// 监听登录信息
const userInfo = ref({});
watch(
  () => store.state.loginUserInfo,
  (newVal, oldVal) => {
    if (newVal !== undefined && newVal !== null) {
      userInfo.value = newVal;
    } else {
      userInfo.value = {};
    }
  },
  { immediate: true, deep: true }
);
// 监听是否登录要弹出登录框
watch(
  () => store.state.showLogin,
  (newVal, oldVal) => {
    if (newVal) {
      loginAndRegistration(1);
    }
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  box-shadow: 0px 2px 6px #ddd;
  background-color: #fff;
  position: fixed;
  top: 0px;
  z-index: 1000;
  .header-content {
    margin: 0 33px;
    height: 60px;
    display: flex;
    align-items: center;
    .header-title {
      .logo {
        text-decoration: none;
        img {
          width: 50px;
          height: 50px;
          opacity: 0.8;
        }
      }
    }
    .menu-plane {
      flex: 1;
      display: flex;
      margin-left: 20px;
      a {
        text-decoration: none;
        color: black;
      }
      a:hover {
        color: #007fff;
      }
      .father-item {
        margin-left: 20px;
        a {
          text-decoration: none;
          color: black;
        }
        a:hover {
          color: #007fff;
        }
      }
    }
    .user-info-plane {
      display: flex;
      align-items: center;
      width: 300px;
      .el-button {
        padding: 4px 10px;
        i::before {
          contain: "";
          display: inline-block;
          margin-left: 5px;
        }
      }
      .el-button-group {
        margin-left: 10px;
      }
      .info-plane {
        display: flex;
        align-items: center;
        .message-info {
          .icon-lingdang {
          font-size: 28px;
          border: none;
          cursor: pointer;
          }
          margin-left: 8px;
          margin-right:20px;
        }
      }
    }
  }
}
.sub-board-list {
  display: flex;
  flex-wrap: wrap;
  .sub-board {
    text-decoration: none;
    padding: 0px 10px;
    border-radius: 10px;
    margin-right: 10px;
    background-color: #e5e5e5;
    border: 1px solid #ddd;
    color: rgb(113, 113, 113);
    margin-top: 10px;
  }
  .sub-board:hover {
    color: #007fff;
  }
}
</style>