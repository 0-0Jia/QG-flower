import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        type: false, // false-> 编辑, true-> 添加
        data: null, 
    },
    mutations: {
        toEdit: (state) => {
            let obj = state
            obj.type = false
        },
        toAdd: (state) => {
            const obj = state
            obj.type = true
        },
        changeData: (state, result) => {
            const obj = state
            obj.data = result
        },
    }
})

export default store