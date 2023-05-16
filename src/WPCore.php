<?php

namespace WarpDriven\WpCore;
use WarpDriven\PhpSdk\Helper;
class WPCore
{
    public function __construct()
    {
        if (defined('WD_WPCore_Loaded')) {
            return;
        }
        define('WD_WPCore_Loaded', true);
        $home = new WPHomePage();
        $setting = new WPSettingPage();
        $ajax = new WPAjax();

        $wd_search_product_list_enable = get_option('wd_search_product_list_enable');
        if(isset($wd_search_product_list_enable)&&esc_attr($wd_search_product_list_enable)==='on'){
            $visualSearch = new WPVisualSearch();
        };

        add_action('woocommerce_update_product', array($this,'my_product_updated'), 10, 2);

        add_action( 'woocommerce_new_product', array($this,'my_product_add'), 10, 1 );

        add_action( 'before_delete_post', array($this,'my_product_delete'), 1, 2 );

    }

    function sendProduct($product){

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


        Helper::init_products(WPCore::getApiKey(), json_encode(array("items" => $products)));
    }

    
    // 删除商品
    function my_product_delete($post_id){

        if (get_post_type($post_id) === 'product') {
            Helper::delete_product(WPCore::getApiKey(), json_encode(array("delete_shop_variant_ids"=>[$post_id])));
        }
       
    }


    // 更新商品
    function my_product_updated($product_id, $product) {
         // 获取商品对象
        $updated_product = wc_get_product($product_id);

        $this->sendProduct($updated_product);
    }

    // 添加商品
    function my_product_add($product_id) {
        // 获取商品对象
       $product = wc_get_product($product_id);

       $this->sendProduct($product);
   }


    public static function getApiKey()
    {
        return get_option('wd_api_key');
    }

    public static function getMillisecond() {
        list($s1, $s2) = explode(' ', microtime());
        return (float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
    }
}