<?php

namespace WarpDriven\WpCore;

class WPVisualSearch{

    public function __construct()
    {
        if (defined('WD_WPVisualSearch_Loaded')) {
            return;
        }
        define('WD_WPVisualSearch_Loaded', true);
        $shortCode = new WPVisualSearchShortCode();
    }

}