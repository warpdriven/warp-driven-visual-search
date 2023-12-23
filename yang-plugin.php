<?php
/*
Plugin Name: Yang Plugin
Plugin URI: https://gitee.com/Swz082421/wordpress-vite
Description: Wordpress plugin for vite
Author: YangLee
Author URI: https://gitee.com/Swz082421
Version: 0.0.1
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

    $option[CURLOPT_URL]            = $url;
    $option[CURLOPT_FOLLOWLOCATION] = TRUE;
    $option[CURLOPT_MAXREDIRS]      = 4;
    $option[CURLOPT_RETURNTRANSFER] = TRUE;
    $option[CURLOPT_TIMEOUT]        = $timeout;
    $option[CURLOPT_HTTPHEADER] = $headers;

    if ($data) {
        if ($type == 'POST') {
            unset($data['access_token']);
            $option[CURLOPT_POSTFIELDS] = json_encode($data);
        }
    }

    //设置证书信息
    if (!empty($cert_info) && !empty($cert_info['cert_file'])) {
        $option[CURLOPT_SSLCERT]       = $cert_info['cert_file'];
        $option[CURLOPT_SSLCERTPASSWD] = $cert_info['cert_pass'];
        $option[CURLOPT_SSLCERTTYPE]   = $cert_info['cert_type'];
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

    $curl_no  = curl_errno($ch);
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
        // add_action("admin_menu", array($this, "admin_wd_vs_woo_menu"));
    }

    public function admin_wd_vs_woo_menu()
    {
        add_options_page(
            "WarpDriven VSR Setting Options",
            "WarpDriven VSR",
            "manage_options",
            "wd-vs-woo-menu",
            array($this, "admin_wd_vs_woo_options")
        );
    }

    public function admin_wd_vs_woo_options()
    {
        include(plugin_dir_path(__FILE__) . "templates/optionspage.php");
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
        if (in_array("woocommerce/woocommerce.php", apply_filters("active_plugins", get_option("active_plugins")))) {
            add_action('wp_ajax_create_rest_api_key', array($this, "create_api"));
        }
        register_setting("warp-driven-settings-group", "wd_consumer_key");
        register_setting("warp-driven-settings-group", "wd_consumer_secret");
    }


    public function getoption()
    {

        $group['wd_api_key'] = get_option('wd_api_key');
        $group['wd_data_server_key'] = get_option('wd_data_server_key');
        $group['wd_data_server'] = get_option('wd_data_server');
        $group['wd_custom_js'] = get_option('wd_custom_js');
        $group['wd_is_test_mode'] = get_option('wd_is_test_mode');
        wp_send_json($group);
    }

    function getrequest()
    {

        include(ABSPATH . '/wp-includes/pluggable.php');

        $json_data = file_get_contents('php://input');
        $_POST = json_decode($json_data, true);

        $gateway_url = 'https://api-stg.warpdriven.ai';

        $data['site_url'] = $_POST['site_url'];
        $data['access_token'] = $_POST['access_token'];
        $data['consumer_key'] = 'ck_' . wp_hash(wp_rand(1000, 9999999));

        $data['consumer_secret'] = 'cs_' . wp_hash(wp_rand(1000, 9999999));
        $method = '/connection/woocommerce/connect';

        wp_send_json(GoCurl($gateway_url . $method, 'post', $data));
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

    public function create_api()
    {

        global $wpdb;

        try {
            $consumer_key    = 'ck_' . wc_rand_hash();
            $consumer_secret = 'cs_' . wc_rand_hash();


            $users_query = new WP_User_Query(array(
                'role' => 'administrator',
                'orderby' => 'display_name'
            ));  // query to get admin users
            $results = $users_query->get_results();
            if ($results) {

                if ($results && count($results) > 0) {
                    $user = $results[0];

                    $data = array(
                        'user_id'         => $user->ID,
                        'description'     => "VS_REST_API_KEY",
                        'permissions'     => "read_write",
                        'consumer_key'    => wc_api_hash($consumer_key),
                        'consumer_secret' => $consumer_secret,
                        'truncated_key'   => substr($consumer_key, -7),
                    );

                    $wpdb->insert(
                        $wpdb->prefix . 'woocommerce_api_keys',
                        $data,
                        array(
                            '%d',
                            '%s',
                            '%s',
                            '%s',
                            '%s',
                            '%s',
                        )
                    );

                    if (0 === $wpdb->insert_id) {
                        throw new Exception(__('There was an error generating your API Key.', 'woocommerce'));
                    }

                    $key_id                      = $wpdb->insert_id;
                    $response                    = $data;
                    $response['consumer_key']    = $consumer_key;
                    $response['consumer_secret'] = $consumer_secret;
                    $response['message']         = __('API Key generated successfully. Make sure to copy your new keys now as the secret key will be hidden once you leave this page.', 'woocommerce');
                    $response['revoke_url']      = '<a style="color: #a00; text-decoration: none;" href="' . esc_url(wp_nonce_url(add_query_arg(array('revoke-key' => $key_id), admin_url('admin.php?page=wc-settings&tab=advanced&section=keys')), 'revoke')) . '">' . __('Revoke key', 'woocommerce') . '</a>';

                    delete_option("wd_consumer_key");
                    add_option("wd_consumer_key", $consumer_key);
                    delete_option("wd_consumer_secret");
                    add_option("wd_consumer_secret", $consumer_secret);
                }
            } else {
                throw new Exception(__('Not find Sa user.', 'woocommerce'));
            }
        } catch (Exception $e) {
            wp_send_json(array('message' => $e->getMessage()));
        }
        wp_send_json($response);
    }
}
$WdCreateApiMain = new WDCreateApiMain();

function warpdriven_get_settings()
{
    $WdCreateApiMain = new WDCreateApiMain();
    $WdCreateApiMain->getoption();
    exit;
}

function warpdriven_set_settings()
{
    $WdCreateApiMain = new WDCreateApiMain();
    $WdCreateApiMain->setoption();
    exit;
}

function warpdriven_get_products()
{
    $id = (int)$_GET["id"];
    $product = wc_get_product(intval($id));

    $terms = array();
    if ($product->get_stock_status() == 'instock' && intval($product->get_price()) > 0)   //判断库存和价格
    {
        wp_send_json(array(
            "product_id" => $id,
            "product_sku" => $product->get_sku(),
            "product_title" => $product->get_name(),
            "product_price" => $product->get_price(),
            "product_image_html" => $product->get_image(),
            'main_image_url' => wp_get_attachment_image_url($product->get_image_id(), 'full'),
            "keywords" =>  $terms,
            "product_description" => $product->get_description(),
            "productlink" => get_permalink($id),
            "product_short_description" => $product->get_short_description()
        ));
        exit;
    }
}

add_action('wp_ajax_warpdriven_get_product', 'warpdriven_get_products');
add_action('wp_ajax_nopriv_warpdriven_get_products', 'warpdriven_get_products');

add_action('wp_ajax_warpdriven_set_settings', 'warpdriven_set_settings');
// add_action('wp_ajax_nopriv_warpdriven_set_settings', 'warpdriven_set_settings');

add_action('wp_ajax_warpdriven_get_settings', 'warpdriven_get_settings');
add_action('wp_ajax_nopriv_warpdriven_get_settings', 'warpdriven_get_settings');

// Function to display the custom menu content
function custom_menu_page()
{
    echo '<div id="warpdriven-recs-admin"></div>';
}
// Function to create the custom menu
function custom_admin_menu()
{
    // Add a new top-level menu
    add_menu_page(
        'Yang Plugin Settings', // Page title
        'Yang Plugin',          // Menu title
        'manage_options',       // Capability required to access the menu
        'warpdriven-recs-admin',     // Menu slug
        'custom_menu_page',     // Callback function to display the menu content
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNjAwLjAwMDAwMHB0IiBoZWlnaHQ9IjYwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDYwMC4wMDAwMDAgNjAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNjAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2E3YWFhZCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTE0OTUgNDg0MCBsLTI4MCAtMjgwIDEwNTAgMCBjNjUzIDAgMTA5MyAtNCAxMTY1IC0xMSA2MTkgLTU2IDEwNzcKLTM0NSAxMjk5IC04MTkgMTg5IC00MDUgMTkyIC05NTMgNiAtMTM0MiAtMTggLTM4IC0zMCAtNjggLTI3IC02OCAzIDAgNDkgMzAKMTA0IDY2IDMxMSAyMDcgNTE2IDUxNyA1OTkgOTA0IDIwIDkxIDIzIDEzNSAyMyAzMjUgMSAyNDIgLTkgMzE1IC02NSA1MDAKLTE0NiA0NzYgLTUxNiA4MTQgLTEwMzggOTQ2IC0yMzAgNTkgLTIzOSA1OSAtMTQ0OSA1OSBsLTExMDcgMCAtMjgwIC0yODB6Ii8+CjxwYXRoIGQ9Ik04NDAgNDE4NSBsLTI4NSAtMjg1IDEwNzggMCBjNjc0IDAgMTExNCAtNCAxMTc1IC0xMCA3NjUgLTgyIDEyNjMKLTUxOCAxMzg4IC0xMjE1IDIwIC0xMTEgMjUgLTQyOCA4IC01MDAgbC0xMCAtNDAgLTc0IC0xNCBjLTYxIC0xMSAtMjkyIC0xNQotMTIwNSAtMTggbC0xMTMxIC00IC0yODQgLTI4NCAtMjg1IC0yODUgMTA0MCAwIGM2MDMgMCAxMDg4IDQgMTE1NSAxMCAzMjUgMjgKNTk0IDExOCA4MzQgMjc3IDEyOCA4NSAyMTggMTc0IDI5NSAyOTIgMTg0IDI4MCAyNjQgNjA2IDI0MCA5NzMgLTI1IDM5MCAtMTYzCjcwNCAtNDE5IDk1MiAtMjU2IDI0OSAtNTk1IDM5MCAtMTAyNSA0MjYgLTcxIDYgLTU0OSAxMCAtMTE2NSAxMCBsLTEwNDUgMAotMjg1IC0yODV6Ii8+CjxwYXRoIGQ9Ik0zOTQ1IDE2MDkgYy0xNjkgLTgxIC0zOTggLTEzOSAtNjIwIC0xNTggLTczIC03IC01MjYgLTExIC0xMTYwIC0xMQpsLTEwNDAgMCAtMjgwIC0yODAgLTI4MCAtMjgwIDEwOTIgMCBjMTE5NiAwIDEyMDcgMCAxNDM2IDU5IDM5MiAxMDIgNzEzIDMzMQo5MDcgNjQ5IDE4IDI5IDMxIDU0IDI5IDU2IC0yIDIgLTQwIC0xNCAtODQgLTM1eiIvPgo8L2c+Cjwvc3ZnPgo=' // Icon (optional)
    );
}
// Hook to add the custom menu
add_action('admin_menu', 'custom_admin_menu');

// Insert vite packaged results
function load_assets($hook)
{
    $ver = '0.0.1';
    // wp_enqueue_script('vite', 'http://localhost:3002/vite-dev-react.js', array(), $ver, true);
    wp_enqueue_style('warpdriven-recs-style', plugin_dir_url(__FILE__) . 'dist/style.css', array(), $ver, false);
    wp_enqueue_script('warpdriven-recs-main', plugin_dir_url(__FILE__) . 'dist/warpdriven-recs-main.js', array(), $ver, true);
}
add_action('admin_enqueue_scripts', 'load_assets');
add_action('wp_enqueue_scripts', 'load_assets');

function to_script_module($tag, $handle)
{
    if (strpos($tag, 'warpdriven-recs-main.js') !== false) {
        $tag = str_replace('<script', '<script type="module"', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'to_script_module', 10, 2);

// Define the shortcode
function custom_shortcode_function()
{

    $product_id = get_the_ID();
    $product = wc_get_product($product_id);
    $json_data = json_encode(array(
        'id' => $product_id,
        'title' => $product->get_name(),
        // 'image_url' => $product->get_image_url(),
        "price" => $product->get_price(),
        'url' => $product->get_permalink(),
        // "description" => $product->get_description(),
        'variations' => $product->get_children()
    ));

    return '<script id="warpdriven-recs-json-product" type="application/json">'
        . $json_data .
        '</script>' .
        '<div id="warpdriven-recs-vsr"></div>';
}
add_shortcode('warpdriven-recs-vsr', 'custom_shortcode_function');

// Render shoort code
function render_warpdriven_visual_similar()
{
    echo do_shortcode('[warpdriven-recs-vsr]');
}
add_action('woocommerce_after_single_product', 'render_warpdriven_visual_similar');

// 添加脚部 HTML
function add_custom_footer_content()
{
    echo '<div id="custom-footer-content">';
    echo '<p>This is my custom footer content added by the Custom Footer Plugin.</p>';
    echo '</div>';
}
add_action('wp_footer', 'add_custom_footer_content');

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
