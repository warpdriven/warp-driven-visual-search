<?php

namespace WarpDriven\WpCore;
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