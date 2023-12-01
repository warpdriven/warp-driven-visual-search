<?php

namespace WarpDrivenWpCore;
class  WPSettingPage
{

    
    public function __construct()
    {
        add_action("admin_init", array($this, "admin_register_wd_vs_woo_settings"));
        add_action("admin_menu", array($this, "admin_wd_vs_woo_menu"));
    }

    public function admin_wd_vs_woo_menu()
    {
        add_options_page(
            "WarpDriven VSR Setting Options",
            "WarpDriven VSR",
            "manage_options",
            "wd-vs-woo-menu",
            array($this, "admin_wd_vs_woo_options"));
    }

    public function admin_wd_vs_woo_options()
    {
        include (plugin_dir_path(__FILE__) . "templates/optionspage.php");
    }

    public function admin_register_wd_vs_woo_settings()
    {
        register_setting("wd-vs-woo-settings-group", "wd_api_key");
    }
}