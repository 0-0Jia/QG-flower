import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        data: null, 
        hadChange: true,
    },
    mutations: {
        changeData: (state, result) => {
            const obj = state
            obj.data = result
        },
    }
})

export default store