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
        add_settings_section(
            'wd_wp_core_setting',
            __('General', 'warp-driven'),
            array($this, 'section_callback'),
            'warp-driven-setting'
        );

        register_setting(
            'general',
            'wd_api_key'
        );

        add_settings_field(
            'wd_api_key',
            __('API Key', 'wd-woo-plugin-vs'),
            array($this, 'api_key_callback'),
            'warp-driven-setting',
            'wd_wp_core_setting'
        );

        $fields =array(
            array("name"=>"wd_search_product_list_title","label"=>"Search Product List Title"),
            array("name"=>"wd_search_product_icon_size","label"=>"Icon Size"),
            array("name"=>"wd_search_product_icon_top","label"=>"Icon Top"),
            array("name"=>"wd_search_product_icon_left","label"=>"Icon Left"),
            array("name"=>"wd_search_product_icon_right","label"=>"Icon Right"),
            array("name"=>"wd_search_product_icon_bottom","label"=>"Icon Bottom"),
            array("name"=>"wd_search_product_test_icon_size","label"=>"Test Icon Size"),
            array("name"=>"wd_search_product_test_icon_top","label"=>"Test Icon Top"),
            array("name"=>"wd_search_product_test_icon_left","label"=>"Test Icon Left"),
            array("name"=>"wd_search_product_test_icon_right","label"=>"Test Icon Right"),
            array("name"=>"wd_search_product_test_icon_bottom","label"=>"Test Icon Bottom"),
        );

        $this->add_settings_fields($fields);

    }

    public function add_settings_fields($fields){
        foreach($fields as $field){
            register_setting(
                'general',
                $field['name']
            );

            add_settings_field(
                $field['name'],
                __($field['label'], 'wd-woo-plugin-vs'),
                array($this, 'add_filed_callback'),
                'warp-driven-setting',
                'wd_wp_core_setting',
                $field
            );
        }
    }

    public function add_filed_callback($field){
        $value = get_option($field['name']);
        ?>
           <input type="text" name="<?php echo $field['name'] ?>" value="<?php echo isset($value) ? esc_attr($value) : ''; ?>">
        <?php
    }



    public function section_callback()
    {
        echo '<p>' . __('', 'wd-woo-plugin-vs') . '</p>';
    }

    public function api_key_callback()
    {
        $wd_api_key = get_option('wd_api_key');
        ?>
            <input type="text" name="wd_api_key" value="<?php echo isset($wd_api_key) ? esc_attr($wd_api_key) : ''; ?>">
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