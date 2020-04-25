import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        type: false, // false-> 编辑, true-> 添加
        data: null
    },
    mutations: {
        edit: (state) => {
            let obj = state
            obj.type = false
        },
        add: (state) => {
            const obj = state
            obj.type = true
        },
        changeDate: (state, result) => {
            const obj = state
            obj.data = result
        }
    }
})

export default store