<?php
/*
Plugin Name: WarpDriven Visually Similar Recommendations
Plugin URI: https://warp-driven.com/plugins/wd-vs-woo
Description: WarpDriven Visually Similar Recommendations
Author: Warp Driven Technology
Author URI: https://warp-driven.com/
Text Domain: wd-wgc-woo
Domain Path: /languages/
Version: 2.0.1
*/

if (!defined('ABSPATH')) {
    exit();
}

define("WARPDRIVEN_AI_VERSION", "1.0.3");

function GoCurl($url, $type, $data = false, &$err_msg = null, $timeout = 20, $cert_info = array())
{
    $type = strtoupper($type);
    if ($type == 'GET' && is_array($data)) {
        $data = http_build_query($data);
    }

    $option = array();

    if ($type == 'POST') {
        $option[CURLOPT_POST] = 1;
    }

    $headers = array(
        'Content-Type: application/json',
        'Authorization: Bearer ' . $data['access_token']
    );

    $option[CURLOPT_URL] = $url;
    $option[CURLOPT_FOLLOWLOCATION] = TRUE;
    $option[CURLOPT_MAXREDIRS] = 4;
    $option[CURLOPT_RETURNTRANSFER] = TRUE;
    $option[CURLOPT_TIMEOUT] = $timeout;
    $option[CURLOPT_HTTPHEADER] = $headers;

    if ($data) {
        if ($type == 'POST') {
            unset($data['access_token']);
            $option[CURLOPT_POSTFIELDS] = json_encode($data);
        }
    }

    //设置证书信息
    if (!empty($cert_info) && !empty($cert_info['cert_file'])) {
        $option[CURLOPT_SSLCERT] = $cert_info['cert_file'];
        $option[CURLOPT_SSLCERTPASSWD] = $cert_info['cert_pass'];
        $option[CURLOPT_SSLCERTTYPE] = $cert_info['cert_type'];
    }

    //设置CA
    if (!empty($cert_info['ca_file'])) {
        // 对认证证书来源的检查，0表示阻止对证书的合法性的检查。1需要设置CURLOPT_CAINFO
        $option[CURLOPT_SSL_VERIFYPEER] = 1;
        $option[CURLOPT_CAINFO] = $cert_info['ca_file'];
    } else {
        // 对认证证书来源的检查，0表示阻止对证书的合法性的检查。1需要设置CURLOPT_CAINFO
        $option[CURLOPT_SSL_VERIFYPEER] = 0;
    }

    $ch = curl_init();

    curl_setopt_array($ch, $option);
    $response = curl_exec($ch);

    $curl_no = curl_errno($ch);
    $curl_err = curl_error($ch);
    curl_close($ch);

    // error_log
    if ($curl_no > 0) {
        if ($err_msg !== null) {
            $err_msg = '(' . $curl_no . ')' . $curl_err;
        }
    }
    return $response;
}

class  WPSettingPage
{
    public function __construct()
    {
        add_action("admin_init", array($this, "admin_register_wd_vs_woo_settings"));
    }

    public function admin_register_wd_vs_woo_settings()
    {
        register_setting("warp-driven-settings-group", "wd_api_key");
        register_setting("warp-driven-settings-group", "wd_data_server_key");
        register_setting("warp-driven-settings-group", "wd_data_server");
        register_setting("warp-driven-settings-group", "wd_custom_js");
        register_setting("warp-driven-settings-group", "wd_is_test_mode");
    }
}

$Wdinit = new WPSettingPage();

class WDCreateApiMain
{
    public function __construct()
    {
    }

    public function setoption()
    {
        $json_data = file_get_contents('php://input');
        $_POST = json_decode($json_data, true);
        update_option('wd_api_key', $_POST['wd_api_key']);
        update_option('wd_data_server_key', $_POST['wd_data_server_key']);
        update_option('wd_data_server', $_POST['wd_data_server']);
        update_option('wd_custom_js', $_POST['wd_custom_js']);
        update_option('wd_is_test_mode', $_POST['wd_is_test_mode']);
        $arr['status'] = 1;
        $arr['msg'] = 'success';
        wp_send_json($arr);
    }
}

$WdCreateApiMain = new WDCreateApiMain();

function warpdriven_set_settings()
{
    $request_method = $_SERVER['REQUEST_METHOD'];
    if ($request_method !== 'POST') {
        exit;
        return;
    }

    $WdCreateApiMain = new WDCreateApiMain();
    $WdCreateApiMain->setoption();
    exit;
}

add_action('wp_ajax_warpdriven_set_settings', 'warpdriven_set_settings');

function warpdriven_get_products()
{
    $request_method = $_SERVER['REQUEST_METHOD'];
    if ($request_method !== 'POST') {
        exit;
        return;
    }

    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);

    $ids = $data['ids'];
    $prodataarr = array();
    if (is_array($ids)) {

        foreach ($ids as $key => $vo) {

            $product = wc_get_product(intval($vo));
            $status = $product->get_status();
            if ($product->get_stock_status() == 'instock' && intval($product->get_price()) > 0 && $status === 'publish')   //判断库存和价格
            {
                $prodataarr[$key] = array(
                    "product_id" => $vo,
                    "product_sku" => $product->get_sku(),
                    "product_title" => $product->get_name(),
                    "product_price" => $product->get_price(),

                    'main_image_url' => wp_get_attachment_image_url($product->get_image_id(), 'full'),

                    "productlink" => get_permalink($vo),

                );

            }

        }
    }
    wp_send_json($prodataarr);
    exit;
}

add_action('wp_ajax_warpdriven_get_products', 'warpdriven_get_products', 1, 3);
add_action('wp_ajax_nopriv_warpdriven_get_products', 'warpdriven_get_products', 1, 3);

// Function to display the custom menu content
function warpdriven_menu_page()
{
    echo '<div id="warpdriven-recs-admin"></div>';
}

// Function to create the custom menu
function warpdriven_admin_menu()
{
    // Add a new top-level menu
    add_menu_page(
        'WrapDriven AI Settings', // Page title
        'WrapDriven AI',          // Menu title
        'manage_options',       // Capability required to access the menu
        'warpdriven-ai-settings',     // Menu slug
        'warpdriven_menu_page',     // Callback function to display the menu content
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNjAwLjAwMDAwMHB0IiBoZWlnaHQ9IjYwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDYwMC4wMDAwMDAgNjAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNjAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2E3YWFhZCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTE0OTUgNDg0MCBsLTI4MCAtMjgwIDEwNTAgMCBjNjUzIDAgMTA5MyAtNCAxMTY1IC0xMSA2MTkgLTU2IDEwNzcKLTM0NSAxMjk5IC04MTkgMTg5IC00MDUgMTkyIC05NTMgNiAtMTM0MiAtMTggLTM4IC0zMCAtNjggLTI3IC02OCAzIDAgNDkgMzAKMTA0IDY2IDMxMSAyMDcgNTE2IDUxNyA1OTkgOTA0IDIwIDkxIDIzIDEzNSAyMyAzMjUgMSAyNDIgLTkgMzE1IC02NSA1MDAKLTE0NiA0NzYgLTUxNiA4MTQgLTEwMzggOTQ2IC0yMzAgNTkgLTIzOSA1OSAtMTQ0OSA1OSBsLTExMDcgMCAtMjgwIC0yODB6Ii8+CjxwYXRoIGQ9Ik04NDAgNDE4NSBsLTI4NSAtMjg1IDEwNzggMCBjNjc0IDAgMTExNCAtNCAxMTc1IC0xMCA3NjUgLTgyIDEyNjMKLTUxOCAxMzg4IC0xMjE1IDIwIC0xMTEgMjUgLTQyOCA4IC01MDAgbC0xMCAtNDAgLTc0IC0xNCBjLTYxIC0xMSAtMjkyIC0xNQotMTIwNSAtMTggbC0xMTMxIC00IC0yODQgLTI4NCAtMjg1IC0yODUgMTA0MCAwIGM2MDMgMCAxMDg4IDQgMTE1NSAxMCAzMjUgMjgKNTk0IDExOCA4MzQgMjc3IDEyOCA4NSAyMTggMTc0IDI5NSAyOTIgMTg0IDI4MCAyNjQgNjA2IDI0MCA5NzMgLTI1IDM5MCAtMTYzCjcwNCAtNDE5IDk1MiAtMjU2IDI0OSAtNTk1IDM5MCAtMTAyNSA0MjYgLTcxIDYgLTU0OSAxMCAtMTE2NSAxMCBsLTEwNDUgMAotMjg1IC0yODV6Ii8+CjxwYXRoIGQ9Ik0zOTQ1IDE2MDkgYy0xNjkgLTgxIC0zOTggLTEzOSAtNjIwIC0xNTggLTczIC03IC01MjYgLTExIC0xMTYwIC0xMQpsLTEwNDAgMCAtMjgwIC0yODAgLTI4MCAtMjgwIDEwOTIgMCBjMTE5NiAwIDEyMDcgMCAxNDM2IDU5IDM5MiAxMDIgNzEzIDMzMQo5MDcgNjQ5IDE4IDI5IDMxIDU0IDI5IDU2IC0yIDIgLTQwIC0xNCAtODQgLTM1eiIvPgo8L2c+Cjwvc3ZnPgo=' // Icon (optional)
    );
}

// Hook to add the custom menu
add_action('admin_menu', 'warpdriven_admin_menu');

// Insert vite packaged results
function warpdriven_load_assets_for_site($hook)
{
    $ver = '0.0.1';

    // Dev mode
    $dev_mode = false;
    if ($dev_mode) {
        wp_enqueue_script('vite', 'http://localhost:3002/vite-dev-react.js', array(), $ver, true);
        return;
    }

    // Custom assets JS
    $wd_custom_js = get_option('wd_custom_js');
    if ($wd_custom_js) {
        wp_enqueue_script('warpdriven-recs-mainSite', $wd_custom_js, array(), $ver, true);
        return;
    }

    // Fallback assets
    wp_enqueue_style('warpdriven-recs-style', plugin_dir_url(__FILE__) . 'dist/style.css', array(), $ver, false);
    wp_enqueue_script('warpdriven-recs-mainSite', plugin_dir_url(__FILE__) . 'dist/warpdriven-recs-mainSite.js', array(), $ver, true);
}

add_action('wp_enqueue_scripts', 'warpdriven_load_assets_for_site');

function warpdriven_load_assets_for_admin()
{
    $ver = '0.0.1';

    // Dev mode
    $dev_mode = false;
    if ($dev_mode) {
        wp_enqueue_script('vite', 'http://localhost:3002/vite-dev-react.js', array(), $ver, true);
        return;
    }

    // Fallback assets
    wp_enqueue_style('warpdriven-recs-style', plugin_dir_url(__FILE__) . 'dist/style.css', array(), $ver, false);
    wp_enqueue_script('warpdriven-recs-mainAdmin', plugin_dir_url(__FILE__) . 'dist/warpdriven-recs-mainAdmin.js', array(), $ver, true);
}

add_action('admin_enqueue_scripts', 'warpdriven_load_assets_for_admin');

function to_script_module($tag, $handle)
{
    if (strpos($tag, 'warpdriven-recs-main') !== false) {
        $tag = str_replace('<script', '<script type="module"', $tag);
    }
    return $tag;
}

add_filter('script_loader_tag', 'to_script_module', 10, 2);

// Define the shortcode
function custom_shortcode_function()
{
    return '<div id="warpdriven-recs-vsr"></div><div id="warpdriven-recs-cf"></div>';
}

add_shortcode('warpdriven-recs-vsr', 'custom_shortcode_function');

// Render shoort code
function render_warpdriven_visual_similar()
{
    echo do_shortcode('[warpdriven-recs-vsr]');
}

add_action('woocommerce_after_single_product', 'render_warpdriven_visual_similar');

// Wordpress footer content
function warpdriven_footer_content()
{
    // Output plugin settings
    $page_type = 'fallback';
    if (is_product()) {
        $page_type = 'product';
    }
    if (is_shop()) {
        $page_type = 'shop';
    }
    if(is_product_category()){
        $page_type = 'shop';
    }
    if(is_product_tag()){
        $page_type = 'shop';
    }
    if (is_admin()) {
        $page_type = 'admin';
    }

    // Get current user email
    $user_email = '';
    $current_user = wp_get_current_user();
    if ( $current_user->exists() ) {
        $user_email = $current_user->user_email;
    }

    // Get product list
    $collection = '';
    $collection_products = array();
    if (is_product_category()) {
        $collection = get_queried_object()->term_id;
    }
    if (is_product_tag()) {
        $collection = get_queried_object()->term_id;
    }
    while(have_posts()){
        the_post();
        $product = wc_get_product(get_the_ID());
        if($product instanceof WC_Product){
            array_push($collection_products, $product->get_id());
        }
    }
    
    // Output json
    $settings_json = json_encode(array(
        'collection' => $collection,
        'collection_products' => $collection_products,
        'page_type' => $page_type,
        'user_email' => $user_email,
        'wd_api_key' => get_option('wd_api_key'),
        'wd_data_server_key' => get_option('wd_data_server_key'),
        'wd_data_server' => get_option('wd_data_server'),
        'wd_custom_js' => get_option('wd_custom_js'),
        'wd_is_test_mode' => get_option('wd_is_test_mode'),
    ));

    echo '<script id="warpdriven-recs-json-settings-main" type="application/json">'
        . $settings_json .
        '</script>';

    // Output product information
    if ($page_type !== 'product') {
        return;
    }
    $product_id = get_the_ID();
    $product = wc_get_product($product_id);
    $product_json = json_encode(array(
        'id' => $product_id,
        'title' => $product->get_name(),
        'price' => $product->get_price(),
        'url' => $product->get_permalink(),
        'variations' => $product->get_children()
    ));

    echo '<script id="warpdriven-recs-json-product" type="application/json">'
        . $product_json .
        '</script>';
}

add_action('wp_footer', 'warpdriven_footer_content');
add_action('admin_footer', 'warpdriven_footer_content');

// Add ajax for validate the plugin is installed
// function warpdriven_validate_plugin_installed()
// {
//     $request_method = $_SERVER['REQUEST_METHOD'];
//     $json_data = file_get_contents('php://input');
//     $data = json_decode($json_data, true);

//     if ($request_method === 'GET') {
//         wp_send_json(array(
//             'msg' => 'installed'
//         ));
//     }

//     wp_send_json(array(
//         'msg' => 'method is not get'
//     ));
// }
// add_action('wp_ajax_warpdriven_validate_plugin_installed', 'warpdriven_validate_plugin_installed');
// add_action('wp_ajax_nopriv_warpdriven_validate_plugin_installed', 'warpdriven_validate_plugin_installed');
