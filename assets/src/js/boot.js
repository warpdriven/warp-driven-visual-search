import { createApp } from 'vue'
import HomePage from '../../../node_modules/wd-vue-lib/src/components/warp-driven/wd/community-home-page.vue'
import VisualSearch from '../../../node_modules/wd-vue-lib/src/components/warp-driven/wd/visual-search-page.vue'
import SettingPage from '../../../node_modules/wd-vue-lib/src/components/warp-driven/wd/community-setting-page.vue'
import {config} from '../../../node_modules/wd-vue-lib/src/api/api-setting'
config({
   INIT_PRODUCTS:{
        ajax_url:wd_woo_plugin_vs.ajax_url
    },
    GET_VS_CREDIT_STATUS:{
        ajax_url:wd_woo_plugin_vs.ajax_url
    },
    GET_PRODUCT_HTML:{
        ajax_url:wd_woo_plugin_vs.ajax_url,
    },
    GET_PRODUCTS_HTML_BY_VS:{
        ajax_url:wd_woo_plugin_vs.ajax_url,
    },
    GET_PRODUCT_LIST_HTML:{
        ajax_url:wd_woo_plugin_vs.ajax_url,
    },
    GET_PRODUCT_HANDLE_HISTORY:{
        ajax_url:wd_woo_plugin_vs.ajax_url,
    },
    GET_PRODUCT_CATEGORIES:{
        ajax_url:wd_woo_plugin_vs.ajax_url,
    },
    GET_PRODUCTS_BY_CATEGORY:{
        ajax_url:wd_woo_plugin_vs.ajax_url,
        action:"wd_get_woo_products_by_category"
    },
    GET_USER_EXSITED: {
        ajax_url: "/wp-admin/admin-ajax.php?action=wd_get_user_exsited",
        method: "GET"
    },
    CREATE_USER: {
        ajax_url: "/wp-admin/admin-ajax.php?action=wd_create_erp_user",
        method: "POST",
        contentType: "application/json"
    },
    CREATE_MY_WEBSITE: {
        ajax_url: "/wp-admin/admin-ajax.php?action=wd_create_my_website",
        method: "POST",
        contentType: "application/json"
    },
    CANCEL_INIT: {
        ajax_url: wd_woo_plugin_vs.ajax_url,
        action: "wd_init_product_cancel",
      },
    GET_ERP_WEBSITE: {
        ajax_url: "/wp-admin/admin-ajax.php?action=wd_get_erp_website",
        method: "GET",
    },
})
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
let app = createApp({}).use(ElementPlus).component('home-page',HomePage).component('visual-search',VisualSearch).component('setting-page',SettingPage).mount('#app')