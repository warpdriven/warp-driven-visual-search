<?php
/*
Plugin Name: WD Woo Plugin VS Community
Plugin URI: https://warp-driven.com/
Description: Warp Driven Wordpress Core
Author: Warp Driven
Author URI: https://warp-driven.com/
Text Domain: wd-woo-plugin-vs-community
Domain Path: /languages/
Version: 0.0.1
*/
require_once "vendor/autoload.php";

use WarpDriven\WpCore\WPCore;

if (!defined('WD_WP_CORE_PLUGIN_FILE')) {
    define('WD_WP_CORE_PLUGIN_FILE', __FILE__);
}

if (!function_exists('wd_woo_plugin_vs_activation')) {
    function wd_woo_plugin_vs_activation()
    {

    }
}

register_activation_hook(__FILE__, 'wd_woo_plugin_vs_activation');

if (!function_exists('wd_woo_plugin_vs_deactivation')) {
    function wd_woo_plugin_vs_deactivation()
    {
        delete_option('wd_api_key');
    }
}

register_deactivation_hook(__FILE__, 'wd_woo_plugin_vs_deactivation');

add_action('init', function () {
    load_plugin_textdomain('wd-woo-plugin-vs', false, dirname(__FILE__) . '/languages');
    if (!defined('WD_WPCore_Loaded')) {
        $core = new WPCore();
    }
});

add_action('admin_enqueue_scripts', function () {
    $plugin_version = get_plugin_data(WD_WP_CORE_PLUGIN_FILE)['Version'];
    wp_enqueue_style('wd-woo-plugin-vs-style', plugins_url('/assets/css/backend.css', WD_WP_CORE_PLUGIN_FILE), array(), $plugin_version);
    wp_style_add_data('wd-woo-plugin-vs-style', 'rtl', 'replace');
    wp_enqueue_script('wd-woo-plugin-vs-script', plugins_url('/assets/js/backend.js', WD_WP_CORE_PLUGIN_FILE), array('jquery'), $plugin_version, true);
    wp_localize_script('wd-woo-plugin-vs-script', 'wd_woo_plugin_vs', array(
        'ajax_url' => admin_url('admin-ajax.php')
    ));
});

add_action('wp_enqueue_scripts', function () {
    $plugin_version = get_plugin_data(WD_WP_CORE_PLUGIN_FILE)['Version'];
    wp_enqueue_style('wd-woo-plugin-vs-frontend-style', plugins_url('/assets/css/frontend.css', WD_WP_CORE_PLUGIN_FILE), array(), $plugin_version);
    wp_style_add_data('wd-woo-plugin-vs-frontend-style', 'rtl', 'replace');
    wp_enqueue_script('wd-woo-plugin-vs-frontend-script', plugins_url('/assets/js/frontend.js', WD_WP_CORE_PLUGIN_FILE), array('jquery'), $plugin_version, true);
    wp_localize_script('wd-woo-plugin-vs-frontend-script', 'wd_woo_plugin_vs', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'icon_css'=>array(
            'size'=>sanitize_text_field(get_option("wd_search_product_icon_size")),
            'top'=>sanitize_text_field(get_option("wd_search_product_icon_top")),
            'left'=>sanitize_text_field(get_option("wd_search_product_icon_left")),
            'right'=>sanitize_text_field(get_option("wd_search_product_icon_right")),
            'bottom'=>sanitize_text_field(get_option("wd_search_product_icon_bottom"))
        ),
        'test_icon_css'=>array(
            'size'=>sanitize_text_field(get_option("wd_search_product_test_icon_size")),
            'top'=>sanitize_text_field(get_option("wd_search_product_test_icon_top")),
            'left'=>sanitize_text_field(get_option("wd_search_product_test_icon_left")),
            'right'=>sanitize_text_field(get_option("wd_search_product_test_icon_right")),
            'bottom'=>sanitize_text_field(get_option("wd_search_product_test_icon_bottom"))
        )
    ));
});