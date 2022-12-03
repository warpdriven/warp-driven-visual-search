import Vue from "vue";
import ElementUI from 'element-ui';

Vue.use(ElementUI, {size: 'small'});
window.Vue = Vue;
Vue.component('app', require('./components/App.vue').default);
Vue.component('optimize-page', require('./components/optimize-page.vue').default);
Vue.component('products-handle-history-page', require('./components/products-handle-history-page.vue').default);

const app = new Vue({
    el: '#app'
});