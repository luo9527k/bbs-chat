import { createStore } from 'vuex'

export default createStore({
    state:{
        articleList:null
    },
    getter:{},
    mutations:{
        updateArticle:(state,value)=>{
            state.articleList = value
        }
    },
    actions:{
        getArticle:(context)=>{
            context.commit('updateArticle')
        }
    }
})