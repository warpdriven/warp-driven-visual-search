<?php
/**
 * WooCommerce ajax
 */

namespace WarpDrivenWpCore;
include_once "Helper.php";
use WarpDrivenWpCore\Helper;
use WC_Shortcodes;
use WP_Query;


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
            'init_products',
            'get_vs_credit_status',
            'get_woo_product_html',
            'get_woo_products_html_by_vs',
            'get_woo_product_categories',
            'get_woo_products_by_category',
            'get_woo_product_list_html',
            'get_woo_product_handle_history',
            'get_user_exsited',
            'create_erp_user',
            'create_my_website',
            'my_website'
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
        foreach($product_categories as $key=>$value){
            $product_categories[$key]->name=str_replace("&amp;","&",$value->name);
        }
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
                array_push($product_ids, $item->shop_variant_id);
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

    public function get_user_exsited(){

        if(get_option("wd_api_key")){
            $result = array( "status"=>true, "msg" => "api key exist!", "data" => true );
        }else{
            $result = Helper::get_user_exsited(get_option('admin_email'));

            if($result->data){
                $result = array( "status"=>true, "msg" => "api key not exist!", "data" => false, "flag" => 1 );
            }
        }

        wp_send_json($result,$result->code);

    }

    public function create_erp_user(){
        $request_body = file_get_contents('php://input');
        
        $data = json_decode($request_body);
        $data-> email = get_option('admin_email');  

        $shop_url = home_url();

        $host = parse_url($shop_url, PHP_URL_HOST);
        $shop_code = explode(".", $host)[0];
        $shop_url = str_replace('http://', '', $shop_url);
        $shop_url = str_replace('https://', '', $shop_url);
        $data -> platform_type = 1; // 这个属性不是从 WooCommerce 配置中获取的

        $result = Helper::get_user_exsited($data-> email);

        if($result->status){

            if($result->data){

            }else{

                // 创建用户
                $data -> name = get_option( 'woocommerce_store_name' ); // 获取商店名称
                $data -> phone = get_option( 'woocommerce_store_phone' ); // 获取商店电话
                $data -> language = get_option( 'WPLANG' ); // 获取语言设置
               
                $data -> shop_code = $shop_code; // 获取商店地址，通常用作商店代码
                $data -> shop_name = get_option( 'woocommerce_store_name' ); // 获取商店名称
                $data -> website = $shop_url; // 获取网站URL
                $data -> address1 = get_option( 'woocommerce_store_address' ); // 获取商店地址
                $data -> address2 = ''; // 这个属性不是从 WooCommerce 配置中获取的
                $data -> city = get_option( 'woocommerce_store_city' ); // 获取商店城市
                $data -> state = get_option( 'woocommerce_default_country' ); // 获取商店默认国家/地区
                $data -> zip = get_option( 'woocommerce_store_postcode' ); // 获取商店邮政编码
                $data -> country = get_option( 'woocommerce_default_country' ); // 获取商店默认国家/地区
                $data -> currency = get_woocommerce_currency(); // 获取商店货币设置
                $data -> timezone = get_option( 'timezone_string' ); // 获取时区设置
                $data -> multi_location_enabled = true; // 这个属性不是从 WooCommerce 配置中获取的
                $data -> cookie_consent_level = 'explicit'; // 获取Cookie同意级别
                $data -> tags = array(); // 这个属性不是从 WooCommerce 配置中获取的
    
                $result = Helper::create_erp_user(json_encode($data));

                if($result -> status){
                    $this->create_website($data->password);
                }
            }


        }

        wp_send_json($result,$result->code);
    }


    private function create_website($password){

        $shop_url = home_url();

        $host = parse_url($shop_url, PHP_URL_HOST);
        $shop_code = explode(".", $host)[0];
        $shop_url = str_replace('http://', '', $shop_url);
        $shop_url = str_replace('https://', '', $shop_url);

        $params = array(
            "email" => get_option('admin_email'),
            "password"=> $password,
            "website_code"=>$shop_code,
            "platform_type"=> 1,
            "url"=> $shop_url
        );

        $result = Helper::my_website(json_encode($params));

        $api_key =  $result-> data;

        if(!$api_key){
        
            $result = Helper::create_my_website(json_encode($params));
            
            if($result -> status){
                $api_key = $result->data->api_key;
            }

        }
        update_option("wd_api_key",$api_key);

        return $result;
    }

    public function create_my_website(){

        $request_body = file_get_contents('php://input');
        
        $data = json_decode($request_body);       

        $result  = $this->create_website($data->password);
        
        wp_send_json($result,$result->code);
    }

}