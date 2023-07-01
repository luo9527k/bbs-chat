/*
 * @Author: SatanYoung amgyjl0926@163.com
 * @Date: 2023-04-10 16:16:15
 * @LastEditors: SatanYoung amgyjl0926@163.com
 * @LastEditTime: 2023-04-20 16:37:25
 * @FilePath: \easybbs\easybbs-web\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/base.scss'
//引入cookies
import VueCookies from 'vue-cookies'
// 引入md5加密
import md5 from 'js-md5'
//引入element plus
import ElementPlus from 'element-plus'
// 引入store
import store from './store/index'

import 'element-plus/dist/index.css'
//图标 图标在附件中
import '@/assets/font/iconfont.css'

// 引入公共组件
import Dialog from '@/components/Dialog.vue'
import Avatar from '@/components/Avatar.vue'
import Cover from '@/components/Cover.vue'
import Pagination from '@/components/Pagination.vue'

// 引入公共方法
import Verify from '@/utils/verify'
import message from '@/utils/message'
import request from '@/utils/request'

const app = createApp(App)

app.component("Dialog", Dialog)
app.component("Avatar", Avatar)
app.component('Cover', Cover)
app.component('Pagination',Pagination)

app.use(router)
app.use(ElementPlus);
app.use(store)

app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.Md5 = md5
app.config.globalProperties.baseConfig = {
    layoutWidth: 1200,
    avatarUrl: '/api/file/getAvatar/',
    coverUrl: '/api/file/getImage/'
}
app.config.globalProperties.Verify = Verify
app.config.globalProperties.Message = message
app.config.globalProperties.Request = request


app.mount('#app')
