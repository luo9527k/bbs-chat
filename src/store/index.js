import { createStore } from 'vuex'
import article from './article'

export default createStore({
    state: {
        loginUserInfo: null,
        showLogin: false
    },
    getters: {
        getLoginUserInfo: (state) => {
            return state.loginUserInfo
        }
    },
    mutations: {
        updateLoginUserInfo: (state, value) => {
            state.loginUserInfo = value
        },
        updateShowLogin: (state, value) => {
            state.showLogin = value
        }
    },
    actions: {},
    modules: {
        article: article
    }
})