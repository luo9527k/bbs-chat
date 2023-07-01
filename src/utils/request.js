/*
 * @Author: SatanYoung amgyjl0926@163.com
 * @Date: 2023-04-14 14:20:46
 * @LastEditors: SatanYoung amgyjl0926@163.com
 * @LastEditTime: 2023-04-19 11:36:47
 * @FilePath: \easybbs-web\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import Message from '@/utils/message';

import { ElLoading } from 'element-plus';
import store from '@/store';

const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8'
const contentTypeJson = 'application/json'

const instance = axios.create({
    baseURL: '/api',
    timeout: 3 * 1000
})

let loading = null
instance.interceptors.request.use(
    (config) => {
        if (config.showLoading) {
            loading = ElLoading.service({
                lock: true,
                text: '加载中......',
                background: 'rgba(0, 0, 0, 0.7)',
            })
        }
        return config
    }, (error) => {
        if (error.config.showLoading && loading) {
            loading.close()
        }
        Message.error('请求发送失败')
        return Promise.reject('请求发送失败')
    })

instance.interceptors.response.use(
    (response) => {
        const { showLoading, errorCallback, showError } = response.config
        if (showLoading && loading) {
            loading.close()
        }
        const responseData = response.data
        if (responseData.code == 200) {
            return responseData
        } else if (responseData.code == 901) {
            store.commit('updateLoginUserInfo', null)
            store.commit('updateShowLogin', true)
            return Promise.reject({ showError: false, msg: '登陆超时' })
        } else {
            if (errorCallback) {
                errorCallback(responseData)
            }
            return Promise.reject({ showError: showError, msg: responseData.info })
        }
    }, (error) => {
        if (error.config.showLoading && loading) {
            loading.close()
        }
        return Promise.reject({ showError: false, msg: '网络异常' })
    }
)

const request = (config) => {
    const { url, params, dataType, showLoading = true, errorCallback, showError = true } = config
    let contentType = contentTypeForm
    let formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key] == undefined ? '' : params[key])
    }

    if (dataType !== null && dataType === 'json') {
        contentType = contentTypeJson
    }
    let headers = {
        'Content-Type': contentType,
        'x-Requested-With': 'XMLHttpRequest',
    }
    return instance.post(url, formData, {
        headers: headers,
        showLoading: showLoading,
        errorCallback: errorCallback,
        showError: showError
    }).catch(error => {
        if (error.showError) {
            Message.error(error.msg)
        }
        return null
    })
}

export default request