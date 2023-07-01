/*
 * @Author: SatanYoung amgyjl0926@163.com
 * @Date: 2023-04-14 14:25:59
 * @LastEditors: SatanYoung amgyjl0926@163.com
 * @LastEditTime: 2023-04-14 14:30:50
 * @FilePath: \easybbs-web\src\utils\message.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ElMessage } from "element-plus";

const showMessage = (msg, callback, type) => {
    ElMessage({
        type: type,
        message: msg,
        duration: 2000,
        onClose: () => {
            if (callback) {
                callback()
            }
        }
    })
}

const message = {
    error: (msg, callback) => {
        showMessage(msg, callback, "error")
    },
    success: (msg, callback) => {
        showMessage(msg, callback, "success")
    },
    warning: (msg, callback) => {
        showMessage(msg, callback, "warning")
    },
}

export default message