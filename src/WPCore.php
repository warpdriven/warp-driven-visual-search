<?php

namespace WarpDrivenWpCore;
include_once "WPSettingPage.php";
include_once "WPAjax.php";

use WarpDrivenWpCore\WPSettingPage;
use WarpDrivenWpCore\WPAjax;
class WPCore
{
    public function __construct()
    {
        if (defined('WD_WPCore_Loaded')) {
            return;
        }
        define('WD_WPCore_Loaded', true);
        $setting = new WPSettingPage();
        $ajax = new WPAjax();
    }

    public static function getApiKey()
    {
        return get_option('wd_api_key');
    }
}