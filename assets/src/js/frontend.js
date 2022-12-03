require('./boot');
import api from "wd-js-lib/src/api/wd-ajax-api";
import {create} from 'wd-js-lib/src/widgets/wd-visual-search';

(function ($) {
    window.$=$;
    window.api=api;
	window.VisualSearch = create;

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
			}
		}
    });
})(jQuery);