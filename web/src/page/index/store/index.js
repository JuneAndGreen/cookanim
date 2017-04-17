import Vue from 'vue';
import Vuex from 'vuex';
/* modules */
import editor from './editor';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        editor,
    },
    state: {},
    actions: {},
    mutations: {},
    plugins: [],
});
