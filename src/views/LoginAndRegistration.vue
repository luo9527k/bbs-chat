<template>
  <Dialog
    :dialogVisible="dialogConfig.dialogVisible"
    :draggable="dialogConfig.draggable"
    :closeOnClickModal="dialogConfig.closeOnClickModal"
    :showClose="dialogConfig.showClose"
    :showCancel="dialogConfig.showCancel"
    :title="dialogConfig.title"
    @close="dialogConfig.dialogVisible = false"
  >
    <el-form
      :rules="rules"
      :model="formDate"
      class="login-registration"
      ref="formDateRef"
    >
      <!-- 邮箱号 -->
      <el-form-item prop="email">
        <el-input
          v-model="formDate.email"
          placeholder="请输入邮箱号"
          clearable
          size="large"
        >
          <template #prefix>
            <i class="iconfont icon-mail"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 邮箱验证码 -->
      <el-form-item
        prop="emailCode"
        class="email-code-panel"
        v-if="opType === 0 || opType === 2"
      >
        <div class="email-code-box">
          <el-input
            v-model="formDate.emailCode"
            placeholder="请输入邮箱验证码"
            clearable
            size="large"
          >
            <template #prefix>
              <i class="iconfont icon-yanzhengma"></i>
            </template>
          </el-input>
          <el-button
            size="large"
            class="email-code-btn"
            type="primary"
            @click="showEmailCodeDialog"
          >
            获取邮箱验证码
          </el-button>
        </div>

        <el-popover placement="left-start" :width="480" trigger="hover">
          <div>
            <p>1、在垃圾箱中查找邮箱验证码</p>
            <p>2、在邮箱中头像->设置->反垃圾->白名单->设置邮件地址白名单</p>
            <p>3、将邮箱【laoluo@wuhancoder.com】添加到白名单</p>
            <a
              style="text-decoration: none; color: #4094ff"
              href="http://easybbs.wuhancoder.com/post/46lrsLUQjQhpZyP"
              >不知道怎么设置？</a
            >
          </div>
          <template #reference>
            <a href="javascript:void(0)">未获取邮箱验证码？</a>
          </template>
        </el-popover>
      </el-form-item>
      <!-- 昵称 -->
      <el-form-item prop="nickName" v-if="opType === 0">
        <el-input
          v-model="formDate.nickName"
          placeholder="请输入昵称"
          clearable
          size="large"
        >
          <template #prefix>
            <i class="iconfont icon-mail"></i>
          </template>
        </el-input>
      </el-form-item>

      <!-- 登录密码 -->
      <el-form-item prop="password" v-if="opType === 1">
        <el-input
          show-password
          v-model="formDate.password"
          placeholder="请输入密码"
          clearable
          size="large"
        >
          <template #prefix>
            <i class="iconfont icon-password"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 注册密码 -->
      <el-form-item prop="registerPassword" v-if="opType === 0 || opType === 2">
        <el-input
          show-password
          v-model="formDate.registerPassword"
          placeholder="请输入密码"
          clearable
          size="large"
        >
          <template #prefix>
            <i class="iconfont icon-password"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 注册再次密码 -->
      <el-form-item
        prop="reRegisterPassword"
        v-if="opType === 0 || opType === 2"
      >
        <el-input
          show-password
          v-model="formDate.reRegisterPassword"
          placeholder="请再次输入密码"
          clearable
          size="large"
        >
          <template #prefix>
            <i class="iconfont icon-password"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 图片验证码 -->
      <el-form-item prop="checkCode">
        <div class="check-code-box">
          <el-input
            v-model="formDate.checkCode"
            placeholder="请输入验证码"
            clearable
            size="large"
          >
            <template #prefix>
              <i class="iconfont icon-yanzhengma"></i>
            </template>
          </el-input>
          <img :src="checkCodeUrl" @click="changeCheckCode(0)" />
        </div>
      </el-form-item>
      <!-- 登录 -->
      <el-form-item v-if="opType === 1">
        <div class="remember-panel">
          <el-checkbox v-model="formDate.rememberMe" size="large">
            记住我
          </el-checkbox>
        </div>
        <div class="no-account">
          <a href="javascript:void(0)" @click="changeOpType(2)">忘记密码？</a>
          <a href="javascript:void(0)" @click="changeOpType(0)">没有账号？</a>
        </div>
      </el-form-item>
      <el-form-item v-if="opType === 1">
        <el-button class="op-btn"  @click="handelSubmit(1)"
          >登录</el-button
        >
      </el-form-item>
      <!-- 注册 -->
      <el-form-item v-if="opType === 0">
        <div class="no-account">
          <a href="javascript:void(0)" @click="changeOpType(1)">已有账号？</a>
        </div>
      </el-form-item>
      <el-form-item v-if="opType === 0">
        <el-button class="op-btn"  @click="handelSubmit(0)"
          >注册</el-button
        >
      </el-form-item>
      <!-- 重置密码 -->
      <el-form-item v-if="opType === 2">
        <div class="no-account">
          <a href="javascript:void(0)" @click="changeOpType(1)">去登录？</a>
        </div>
      </el-form-item>
      <el-form-item v-if="opType === 2">
        <el-button class="op-btn"  @click="handelSubmit(2)"
          >重置密码</el-button
        >
      </el-form-item>
    </el-form>
  </Dialog>
  <!-- 发送邮箱验证码 -->
  <Dialog
    :dialogVisible="dialogConfigSendEmailCode.dialogVisible"
    :draggable="dialogConfigSendEmailCode.draggable"
    :closeOnClickModal="dialogConfigSendEmailCode.closeOnClickModal"
    :showClose="dialogConfigSendEmailCode.showClose"
    :showCancel="dialogConfigSendEmailCode.showCancel"
    :title="dialogConfigSendEmailCode.title"
    :buttons="dialogConfigSendEmailCode.buttons"
    @close="dialogConfigSendEmailCode.dialogVisible = false"
  >
    <el-form
      class="login-registration"
      :model="formDateSendEmailCode"
      ref="formDateSendEmailCodeRef"
      :rules="rules"
    >
      <el-form-item label="邮 箱"> {{ formDate.email }} </el-form-item>
      <el-form-item prop="checkCode" label="验证码">
        <div class="check-code-box">
          <el-input
            v-model="formDateSendEmailCode.checkCode"
            placeholder="请输入验证码"
            clearable
            size="large"
          >
            <template #prefix>
              <i class="iconfont icon-yanzhengma"></i>
            </template>
          </el-input>
          <img :src="checkCodeUrlForEmail" @click="changeCheckCode(1)" />
        </div>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import {useStore} from 'vuex'
import md5 from 'js-md5'
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore()
// Dialog配置项
const dialogConfig = reactive({
  dialogVisible: false,
  draggable: true,
  closeOnClickModal: false,
  showClose: true,
  showCancel: false,
  title: "标题",
});

// 邮箱验证码Dialog配置项
const dialogConfigSendEmailCode = reactive({
  dialogVisible: false,
  draggable: true,
  closeOnClickModal: false,
  showClose: true,
  showCancel: false,
  title: "邮箱验证码",
  buttons: [
    {
      type: "primary",
      text: "发送邮箱验证码",
      click: () => {
        sendEmailCode();
      },
    },
  ],
});

const api = {
  checkCode: "/api/checkCode",
  sendEmailCode: "/sendEmailCode",
  register: "/register",
  login: "/login",
  resetPassword: "/resetPwd",
  getUserInfo: "/getUserInfo",
  logout: "/logout",
};

const formDate = ref({});
const formDateSendEmailCode = ref({});
const formDateRef = ref();
const formDateSendEmailCodeRef = ref();

// 获取邮箱验证码
const sendEmailCode = () => {
  formDateSendEmailCodeRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    } else {
      const params = Object.assign({}, formDateSendEmailCode.value);
      params.type = opType.value == 0 ? 0 : 1;
      let result = await proxy.Request({
        url: api.sendEmailCode,
        params: params,
        errorCallback: () => {
          changeCheckCode(1);
        },
      });
      if (!result) {
        return;
      }
      proxy.Message.success("验证码发送成功，请登录邮箱查看");
      dialogConfigSendEmailCode.dialogVisible = false;
    }
  });
};

// 登录，注册，找回密码
const handelSubmit = (type) => {
  formDateRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }

    const params = Object.assign({}, formDate.value);
    if (opType.value == 0 || opType.value == 2) {
      params.password = params.registerPassword;
      delete params.registerPassword;
      delete params.reRegisterPassword;
    }
    //登录
    if (opType.value == 1) {
      let cookiesLoginInfo = proxy.VueCookies.get("loginInfo");
      let cookiesPassword=cookiesLoginInfo==null?null:cookiesLoginInfo.password
      if(params.password!= cookiesPassword){
        params.password=md5(params.password)
      }
    }
    let url = null;
    if (opType.value == 0) {
      url = api.register;
    } else if (opType.value == 1) {
      url = api.login;
    } else if (opType.value == 2) {
      url = api.resetPassword;
    }
    let result = await proxy.Request({
      url: url,
      params: params,
      errorCallback: () => {
        changeCheckCode(0);
      },
    });
    if (!result) {
      return;
    }
    if (opType.value == 0) {
      // 注册返回
      proxy.Message.success("注册成功");
      showPanel(1);
    } else if (opType.value == 1) {
      //登录
      store.commit('updateLoginUserInfo',result.data)
      proxy.Message.success("登录成功");
      if (params.rememberMe) {
        const loginInfo = {
          email: params.email,
          password: params.password,
          rememberMe: params.rememberMe,
        };
        proxy.VueCookies.set("loginInfo", loginInfo, "7d");
      } else {
        proxy.VueCookies.remove("loginInfo");
      }
      dialogConfig.dialogVisible = false;
    } else if (opType == 2) {
      //重置密码返回
      proxy.Message.success("修改密码成功");
      showPanel(1);
    }
  });
};

// 打开邮箱验证码Dialog
const showEmailCodeDialog = () => {
  formDateRef.value.validateField("email", (valid) => {
    if (!valid) {
      return;
    } else {
      dialogConfigSendEmailCode.dialogVisible = true;
      nextTick(() => {
        changeCheckCode(1);
        formDateSendEmailCodeRef.value.resetFields();
        formDateSendEmailCode.value = {
          email: formDate.value.email,
        };
      });
    }
  });
};

// 校验规则
const reRegisterPasswordVerify = (rule, value, callback) => {
  if (value !== formDate.value.registerPassword) {
    callback(new Error(rule.message));
  } else {
    callback();
  }
};

const rules = reactive({
  email: [
    {
      required: true,
      message: "请输入邮箱",
    },
    {
      max: 150,
      message: "邮箱名太长",
    },
    {
      validator: proxy.Verify.email,
      message: "请输入正确的邮箱",
    },
  ],
  emailCode: [{ required: true, message: "请输入邮箱验证码" }],
  nickName: [
    { required: true, message: "请输入用户名" },
    {
      max: 20,
      message: "昵称太长",
    },
  ],
  password: [{ required: true, message: "请输入密码" }],
  registerPassword: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "请输入8-18为密码,至少一个数字一个字母",
    },
  ],
  reRegisterPassword: [
    { required: true, message: "请再次输入密码" },
    {
      validator: reRegisterPasswordVerify,
      message: "两次密码不一样",
    },
  ],
});

// 0注册 1登录 2找回密码
const opType = ref();

// 显示Dialog
const showPanel = (type) => {
  opType.value = type;
  resetForm();
};
defineExpose({ showPanel });



// 重置表单
const resetForm = () => {
  dialogConfig.dialogVisible = true;
  if (opType.value === 0) {
    dialogConfig.title = "注册";
  } else if (opType.value === 1) {
    dialogConfig.title = "登录";
  } else if (opType.value === 2) {
    dialogConfig.title = "重置密码";
  }
  nextTick(() => {
    changeCheckCode(0);
    let cookiesLoginInfo = proxy.VueCookies.get("loginInfo");
    if (cookiesLoginInfo !== null) {
      formDate.value = cookiesLoginInfo;
    } else {
      formDateRef.value.resetFields();
      formDate.value = {};
    }

    //登录
    if(opType.value==1){
      const cookiesLoginInfo=proxy.VueCookies.get('loginInfo');
      if(cookiesLoginInfo){
        formDate.value= cookiesLoginInfo;
      }
    }
  });
};
// 修改Op类型
const changeOpType = (type) => {
  opType.value = type;
  resetForm();
};

// 验证码
const checkCodeUrl = ref(api.checkCode);
const checkCodeUrlForEmail = ref(api.checkCode);
const changeCheckCode = (type) => {
  if (type === 0) {
    checkCodeUrl.value =
      api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  } else if (type === 1) {
    checkCodeUrlForEmail.value =
      api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
  }
};
</script>

<style lang="scss" scoped>
.login-registration {
  .check-code-box {
    display: flex;
    img {
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .remember-panel {
    width: 100%;
  }
  .no-account {
    width: 100%;
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
      color: #4094ff;
    }
  }
  .op-btn {
    width: 100%;
  }
  .email-code-box {
    width: 100%;
    display: flex;

    .email-code-btn {
      margin-left: 5px;
    }
  }
  .email-code-panel {
    a {
      text-decoration: none;
      color: #4094ff;
      font-size: 8px;
    }
  }
}
</style>