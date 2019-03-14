// initial state
const state = {
    count: 0
}
// getters
const getters = {
    // 类似计算属性的写法
    count(state, getters, rootState) {
        // 当前state,当前getters,根数据(估计是App.vue的数据或者是工程的配置数据)
        // console.log('getter的参数:', state, getters, rootState);
        // console.log(state);
        return {
            count: state.count
        }
    }
}
// actions:接收异步函数，真正的值得修改，commit到mutations
const actions = {
    // {commit,state}是连个默认的上下文参数
    acAdd({ commit, state }, num) {
        commit('add', num);
    },
    acDecrease({ commit, state }, num) {
        // console.log(state);//有值
        commit('decrease', num);
    }
}
// mutations,同步操作，修改state
const mutations = {
    add(state, num) {
        state.count += num;
    },
    decrease(state, num) {
        state.count -= num;
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}