import api from "wd-js-lib/src/api/wd-ajax-api";
window.$ = jQuery;
window.api=api;
api.config({
    API:{
        GET_WOO_PRODUCT_HTML:{
            ajax_url:wd_woo_plugin_vs.ajax_url,
            action:"wd_get_woo_product_html",
            type:"POST"
        },
        GET_WOO_PRODUCTS_HTML_BY_VS:{
            ajax_url:wd_woo_plugin_vs.ajax_url,
            action:"wd_get_woo_products_html_by_vs",
            type:"POST"
        },
        GET_WOO_PRODUCT_LIST_HTML:{
            ajax_url:wd_woo_plugin_vs.ajax_url,
            action:"wd_get_woo_product_list_html",
            type:"POST"
        },
        GET_WOO_PRODUCT_HANDLE_HISTORY:{
            ajax_url:wd_woo_plugin_vs.ajax_url,
            action:"wd_get_woo_product_handle_history",
            type:"POST"
        },
        GET_WOO_PRODUCT_CATEGORIES:{
            ajax_url:wd_woo_plugin_vs.ajax_url,
            action:"wd_get_woo_product_categories",
            type:"POST"
        },
        GET_WOO_PRODUCTS_BY_CATEGORY:{
            ajax_url:wd_woo_plugin_vs.ajax_url,
            action:"wd_get_woo_products_by_category",
            type:"POST"
        }
    }
});
require('./boot');
(function ($) {
    window.setCircleProcess = function (el, val) {
        let r = $(el).attr('r');
        let circumference = parseInt(r) * 2 * Math.PI;
        val = val <= 0 ? 0 : val;
        val = val >= 100 ? 100 : val;
        $(el).attr('stroke-dasharray', circumference);
        $(el).attr('stroke-dashoffset', ((100 - val) / 100) * circumference);
    }
})(jQuery);