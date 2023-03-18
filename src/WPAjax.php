<?php
/**
 * WooCommerce ajax
 */

namespace WarpDriven\WpCore;

use WC_Shortcodes;
use WP_Query;

use WarpDriven\PhpSdk\Helper;

class WPAjax 
{

    public function __construct()
    {
        $this->add_ajax();
    }

    /**
     * Add wordpress ajax
     */
    function add_ajax()
    {
        $ajax_events = array(
            'init_products',
            'get_vs_credit_status',
            'get_woo_product_html',
            'get_woo_products_html_by_vs',
            'get_woo_product_categories',
            'get_woo_products_by_category',
            'get_woo_product_list_html',
            'get_woo_product_handle_history',
        );
        foreach ($ajax_events as $ajax_event) {
            add_action('wp_ajax_wd_' . $ajax_event, array($this, $ajax_event));
            add_action('wp_ajax_nopriv_wd_' . $ajax_event, array($this, $ajax_event));
        }
    }

    /**
     * Get a single product html page
     */
    public function get_woo_product_html()
    {
        wp_send_json(
            array(
                "html" => WC_Shortcodes::product(
                    array(
                        "sku" => sanitize_key($_POST["id"]),
                        "id" => sanitize_key($_POST["sku"])
                    )
                )
            )
        );
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

    /**
     * Get the product categorys from woocommerce
     */
    public function get_woo_product_categories()
    {
        $args = array(
            'taxonomy' => 'product_cat',
            'orderby' => 'name',
            'order' => 'asc',
            'count' => true,
            'pad_counts' => true
        );
        $product_categories = array_values(get_terms($args));
        error_log(print_r($product_categories, true));
        wp_send_json($product_categories);
    }

    /**
     * Get products by category
     */
    public function get_woo_products_by_category()
    {
        $categories = rest_sanitize_array($_GET['category']);
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'product_cat',
                    'field' => 'term_id',
                    'terms' => $categories,
                    'operator' => 'IN',
                )
            )
        );

        $post_status = array(
            'publish' => 1,
            'draft' => 2,
            'trash' => 0,
            'wc-out-of-stock' => 3,
            'private' => 4,
            'pending' => 5,
            'failed' => 7,
            'wc-audit-success' => 8,
            'wc-audit-failed' => 7,
            'wc-editing' => 11,
            'wc-force-unpublished' => 14
        );

        $query = new WP_Query( $args );
    
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $product = wc_get_product(get_the_ID());
                $product_categories = array();
                $terms = get_the_terms($product->get_id(), 'product_cat');
        
                if ($terms && !is_wp_error($terms)) {
                    foreach ($terms as $term) {
                        $product_categories[] = array(
                            'cat_id' => $term->term_id,
                            'cat_name' => $term->name
                        );
                    }
                }
        
                $products[] = array(
                    'shop_variant_id' => $product->get_id(),
                    'shop_product_id' => $product->get_parent_id(),
                    'sku' => $product->get_sku(),
                    'product_id' => $product->get_id(),
                    'barcode' => $product->get_meta('_barcode'),
                    'is_default_variant' => $product->get_meta('_default_variant') == 'yes',
                    'title' => $product->get_name(),
                    'stock_quantity' => $product->get_stock_quantity(),
                    'stock_status' => $product->get_stock_status()=='instock'?1:0,
                    'description' => $product->get_description(),
                    'short_description' => $product->get_short_description(),
                    'categories' => $product_categories,
                    'brand' => $product->get_meta('_brand'),
                    'main_image_url' => wp_get_attachment_image_url($product->get_image_id(), 'full'),
                    'image_urls' => array_map(function($image_id) {
                        return wp_get_attachment_image_url($image_id, 'full');
                    }, $product->get_gallery_image_ids()),
                    'product_link' => $product->get_permalink(),
                    'type' => $product->get_type(),
                    'status' => $post_status[$product->get_status()],
                    'regular_price' => floatval($product->get_regular_price()),
                    'price' => floatval($product->get_price()),
                    'sale_price' => floatval($product->get_sale_price()),
                    'cost_price' => 0,
                    'weight' => floatval($product->get_weight()),
                    'colour' => $product->get_meta('_colour'),
                    'size' => $product->get_meta('_size'),
                    'on_sale' => $product->is_on_sale(),
                    'purchasable' => $product->is_purchasable(),
                    'related_ids' => array(),
                    'meta_fields' => array(),
                    'date_created_gmt' => $product->get_date_created()->getOffsetTimestamp(),
                    'date_modified_gmt' => $product->get_date_modified()->getOffsetTimestamp()
                );
            }
        }

        $result = Helper::init_products(WPCore::getApiKey(), json_encode(array("items" => $products)));

        wp_send_json($result);
    }

    /**
     * Query the list of associated products
     */
    public function get_woo_product_list_html()
    {
        $product_id = sanitize_key($_POST['product_id']);
        $body = "";
        $product_ids = array();
        if ($product_id) {
            $result = Helper::visual_search(WPCore::getApiKey(), $product_id);
            foreach ($result as $item) {
                array_push($product_ids, $item->product_id);
            }
            array_unique($product_ids);
            ob_start();
            foreach ($product_ids as $id) {
                $post_object = get_post($id);
                setup_postdata($GLOBALS['post'] = &$post_object);
                wc_get_template_part('content', 'product');
            }
            wp_reset_postdata();
            $body = ob_get_contents();
            ob_end_clean();
        }

        wp_send_json(array('html' => $body, "product_ids" => join(',', $product_ids)));
    }

    /**
     * Query image initialization history
     */
    public function get_woo_product_handle_history()
    {
        $result = Helper::handle_history(WPCore::getApiKey(), sanitize_key($_POST['page_no']), sanitize_key($_POST['page_size']));
        wp_send_json($result);
    }


    /**
     * Initialize product image
     */
    public function init_products()
    {
        $products = rest_sanitize_array($_POST['products']);
        $pdts = array();
        foreach ($products as $product) {
            if ($product['images']) {
                $pdt = json_decode(json_encode($product));
                $images = $pdt->images;
                if (count($images) > 1) {
                    $pdt->images = array($images[0]);
                }
                array_push($pdts, $pdt);
            }
        }
        $result = Helper::init_products(WPCore::getApiKey(), json_encode(array("items" => $pdts)));
        wp_send_json($result);
    }

    /**
     * Get initialization status
     */
    public function get_vs_credit_status()
    {
        $result = Helper::get_vs_credit_status(WPCore::getApiKey());
        wp_send_json($result);
    }

}