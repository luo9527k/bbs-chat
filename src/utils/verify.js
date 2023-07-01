/*
 * @Author: SatanYoung amgyjl0926@163.com
 * @Date: 2023-04-12 19:11:39
 * @LastEditors: SatanYoung amgyjl0926@163.com
 * @LastEditTime: 2023-04-12 21:22:07
 * @FilePath: \easybbs-web\src\utils\verify.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const regs = {
    email: /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
    number: /^([0][1-9][0-9]*)$/,
    password: /^(?=.*?\d)(?=.*?[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,18}$/,
}
const verify = (rule, value, reg, callback) => {
    if (value) {
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error(rule.message))
        }
    }
}

export default {
    email: (rule, value, callback) => {
        return verify(rule, value, regs.email, callback)
    },
    number: (rule, value, callback) => {
        return verify(rule, value, regs.number, callback)
    },
    password: (rule, value, callback) => {
        return verify(rule, value, regs.password, callback)
    }
}