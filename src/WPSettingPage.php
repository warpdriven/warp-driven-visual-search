<?php

namespace WarpDriven\WpCore;
class  WPSettingPage
{
    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_page'));
        add_action('admin_init', array($this, 'setting_init'));
    }

    public function setting_init()
    {
        register_setting(
            'general',
            'wd_api_key'
        );

        add_settings_section(
            'wd_wp_core_setting',
            __('General', 'warp-driven'),
            array($this, 'section_callback'),
            'warp-driven-setting'
        );

        add_settings_field(
            'wd_api_key',
            __('API Key', 'wd-woo-plugin-vs'),
            array($this, 'api_key_callback'),
            'warp-driven-setting',
            'wd_wp_core_setting'
        );
    }

    public function section_callback()
    {
        echo '<p>' . __('', 'wd-woo-plugin-vs') . '</p>';
    }

    public function api_key_callback()
    {
        $wd_api_key = get_option('wd_api_key');
        ?>
        <input type="text" name="wd_api_key"
               value="<?php echo isset($wd_api_key) ? esc_attr($wd_api_key) : ''; ?>">
        <?php
    }

    public function add_page()
    {
        $hookname = add_submenu_page(
            'warp-driven',
            __('Warp Driven Setting', 'warp-driven'),
            __('Setting', 'warp-driven'),
            'manage_options',
            'warp-driven-setting',
            array($this, 'page_html'),
            80
        );

        add_action('load-' . $hookname, array($this, 'submit'));
    }

    public function page_html()
    {
        if (!current_user_can('manage_options')) {
            return;
        }
        if (isset($_GET['settings-updated'])) {
            add_settings_error('warp-driven-setting', 'warp-driven-setting', __('Settings Saved', 'wd-woo-plugin-vs'), 'updated');
        }
        settings_errors('warp-driven-setting');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('general');
                do_settings_sections('warp-driven-setting');
                submit_button(__('Save Settings', 'wd-woo-plugin-vs'));
                ?>
            </form>
        </div>
        <?php
    }

    public function submit()
    {

    }
}