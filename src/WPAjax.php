<?php
/**
 * 基于WooCommerce ajax
 */

namespace WarpDriven\WpCore;

use WC_Shortcodes;

use WC_API_Server;


use WarpDriven\PhpSdk\Helper;

class WPAjax
{


    public function __construct()
    {
        $this->add_ajax();
    }


    function add_ajax()
    {
        $ajax_events = array(
            'init_products',
            'get_vs_init_status',
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
     * 获取单个产品html
     */
    public function get_woo_product_html()
    {
        wp_send_json(
            array(
                "html" => WC_Shortcodes::product(
                    array(
                        "sku" => $_POST["id"],
                        "id" => $_POST["sku"]
                    )
                )
            )
        );
    }

    /**
     * 从 visual search 获取产品列表
     */
    public function get_woo_products_html_by_vs()
    {

        $product_id = $_POST["product_id"];
        // 调用 visual search 
        $products = Helper::visual_search(WPCore::getApiKey(), $product_id);
        $ids = array();
        if (is_array($products)) {
            foreach ($products as $product) {
                array_push($ids, $product->product_id);
            }
        }
        $html = "";
        if (count($ids) > 0) {
            $html = WC_Shortcodes::products(
                array(
                    "ids" => join(",", $ids)
                )
            );
        }
        wp_send_json(
            array(
                "product_id" => $product_id,
                "count" => count($ids),
                "html" => $html
            )
        );
    }

    public function get_woo_product_categories()
    {
        $args = array(
            'taxonomy' => 'product_cat',
            'orderby' => 'name',
            'order' => 'asc',
            'count' => true,
            'pad_counts' => true,
        );
        $product_categories = get_terms($args);
        wp_send_json($product_categories);
    }

    public function get_woo_products_by_category()
    {
        $categories = $_POST['categories'];
        $products = array();
        WC()->api->includes();
		WC()->api->register_resources( new WC_API_Server( '/' ) );
        foreach ($categories as $category) {
            $filter = array(
                'category' => $category,
                'limit' => 1000
            );
            $result = WC()->api->WC_API_Products->get_products(null,null,$filter,1);
            $products=array_merge($products,$result['products']);
            array_unique($products);
        }        
        wp_send_json($products);

    }
    /**
     * 查询商品清单 
     */
    public function get_woo_product_list_html()
    {
        $product_id = $_POST['product_id'];
        $body = "";
        $product_ids = array();
        if ($product_id) {
            $result = Helper::visual_search(WPCore::getApiKey(),$product_id);
            foreach ($result as $item) {
                array_push($product_ids,$item->product_id);
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

        wp_send_json(array('html' => $body,"product_ids"=> join(',',$product_ids)));
    }

    /**
     * 查询图片出来历史记录
     */
    public function get_woo_product_handle_history()
    {
        $result = Helper::handle_history(WPCore::getApiKey(),$_POST['page_no'],$_POST['page_size']);
        wp_send_json($result);
    }

    /**
     * 初始化数据
     */
    public function init_products()
    {
        $products = $_POST['products'];
        $result = Helper::init_products(WPCore::getApiKey(),json_encode(array("items"=>$products)));
        wp_send_json($result);
    }

    /**
     * 查询当前
     */
    public function get_vs_init_status()
    {
        $result = Helper::get_vs_init_status(WPCore::getApiKey());
        wp_send_json($result);
    }

}