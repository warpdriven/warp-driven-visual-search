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