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
            'get_woo_products_html_by_vs'
        );
        foreach ($ajax_events as $ajax_event) {
            add_action('wp_ajax_wd_' . $ajax_event, array($this, $ajax_event));
            add_action('wp_ajax_nopriv_wd_' . $ajax_event, array($this, $ajax_event));
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

}