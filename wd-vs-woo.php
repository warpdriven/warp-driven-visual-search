<?php
/*
Plugin Name: WarpDriven Visually Similar Recommendations
Plugin URI: https://warp-driven.com/plugins/wd-vs-woo
Description: WarpDriven Visually Similar Recommendations
Author: Warp Driven Technology
Author URI: https://warp-driven.com/
Text Domain: wd-wgc-woo
Domain Path: /languages/
Version: 1.1.0
*/

include_once "vendor/autoload.php";
include_once 'src/WPCore.php';
use WarpDrivenWpCore\WPCore;

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