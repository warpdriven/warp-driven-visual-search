<?php

namespace WarpDriven\WpCore;

class WPOptimizePage
{
    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_page'));
    }

    public function add_page()
    {
        $hookname = add_submenu_page(
            'warp-driven',
            __('Warp Driven Optimize', 'warp-driven'),
            __('Optimize', 'warp-driven'),
            'manage_options',
            'warp-driven-optimize',
            array($this, 'page_html'),
            20
        );

        add_action('load-' . $hookname, array($this, 'submit'));
    }

    public function page_html()
    {
        ?>
        <div id="app" class="wrap">
            <optimize-page></optimize-page>
        </div>
        <?php
    }

    public function submit()
    {

    }
}