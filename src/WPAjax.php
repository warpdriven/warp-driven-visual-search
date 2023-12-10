<?php
/**
 * WooCommerce ajax
 */

namespace WarpDrivenWpCore;
include_once "Helper.php";
use WarpDrivenWpCore\Helper;


class WPAjax 
{

    public function __construct()
    {
        Helper::init();
        $this->add_ajax();
    }

    /**
     * Add wordpress ajax
     */
    function add_ajax()
    {
        $ajax_events = array(
            'get_woo_products_html_by_vs',
            'get_warp_driven_settings'
        );
        foreach ($ajax_events as $ajax_event) {
            add_action('wp_ajax_' . $ajax_event, array($this, $ajax_event));
            add_action('wp_ajax_nopriv_' . $ajax_event, array($this, $ajax_event));
        }
    }

    /**
     * Get the product list from visual search
     */
    public function get_woo_products_html_by_vs()
    {

        $product_id = sanitize_key($_POST["product_id"]);
        // 调用 visual search 
        $products = Helper::visual_search(WPCore::getApiKey(), $product_id);
        ob_start();
        ?>
            <ul class="products columns-4">
                <?php
                foreach ($products as $item) {
                    $post_object = get_post($item->shop_variant_id);
                    setup_postdata($GLOBALS['post'] =& $post_object);
                    wc_get_template_part('content', 'product');
                }
                ?>
            </ul>
        <?php
        wp_reset_postdata();
        $body = ob_get_contents();
        ob_end_clean();
        wp_send_json(
            array(
                "product_id" => $product_id,
                "count" => count($products),
                "html" => $body,
                "products" => $products
            )
        );
    }

    public function get_warp_driven_settings(){
        wp_send_json(
            array(
                "api_key" => get_option('wd_api_key'),
                "data_server_key" => get_option('wd_data_server_key'),
                "data_server" => get_option('wd_data_server'),
                "custom_js" => get_option('wd_custom_js'),
                "is_test_mode" => get_option('wd_is_test_mode')=='on',
                "consumer_key" => get_option('wd_consumer_key'),
                "consumer_secret" => get_option('wd_consumer_secret')
            )
        );
    }

}