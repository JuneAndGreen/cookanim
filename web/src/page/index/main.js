import Vue from 'vue';
import store from './store';
import Main from './main.vue';

import XInput from './directive/x-input';

Vue.use(XInput);

new Vue({
    store, // inject store to all children
    el: '#editor',
    render: h => h(Main),
});
