<?php

namespace WarpDriven\WpCore;
class  WPSettingPage
{


    public $fields;

    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_page'));
        add_action('admin_init', array($this, 'setting_init'));
        $this->fields = array(
            array("name" => "wd_api_key", "label" => __("API Key", 'wd-vs-woo')),
            array("name" => "wd_search_product_list_title", "label" => __("Search Product List Title", 'wd-vs-woo')),
            array("name" => "wd_search_product_list_enable", "label" => __("Enbale", 'wd-vs-woo')),
            array("name" => "wd_search_product_icon_size", "label" => __("Icon Size", 'wd-vs-woo')),
            array("name" => "wd_search_product_icon_top", "label" => __("Icon Top", 'wd-vs-woo')),
            array("name" => "wd_search_product_icon_left", "label" => __("Icon Left", 'wd-vs-woo')),
            array("name" => "wd_search_product_icon_right", "label" => __("Icon Right", 'wd-vs-woo')),
            array("name" => "wd_search_product_icon_bottom", "label" => __("Icon Bottom", 'wd-vs-woo')),
            array("name" => "wd_search_product_enable", "label" => __("Enbale", 'wd-vs-woo')),
        );
    }

    public function setting_init()
    {

        register_setting(
            'general',
            'wd_api_key'
        );

        $this->add_settings_fields($this->fields);

    }

    public function add_settings_fields($fields)
    {
        foreach ($fields as $field) {
            register_setting(
                'general',
                $field['name']
            );
        }
    }

    public function section_callback()
    {
        echo '<p>' . __('', 'wd-vs-woo') . '</p>';
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
            add_settings_error('warp-driven-setting', 'warp-driven-setting', __('Settings Saved', 'wd-vs-woo'), 'updated');
        }
        settings_errors('warp-driven-setting');
        ?>
        <div id="app" class="wrap">
            <?php
            $data = array();
            foreach ($this->fields as $field) {
                $value = get_option($field['name']);
                $data[$field['name']] = isset($value) ? esc_attr($value) : '';
            }
            ?>
            <setting-page :action="'options.php'" :data="{
                    'wd_api_key':'<?php echo $data['wd_api_key']; ?>',
                    'wd_search_product_list_title':'<?php echo $data['wd_search_product_list_title']; ?>',
                    'wd_search_product_list_enable':'<?php echo $data['wd_search_product_list_enable']; ?>',
                    'wd_search_product_icon_size':'<?php echo $data['wd_search_product_icon_size']; ?>',
                    'wd_search_product_icon_top':'<?php echo $data['wd_search_product_icon_top']; ?>',
                    'wd_search_product_icon_left':'<?php echo $data['wd_search_product_icon_left']; ?>',
                    'wd_search_product_icon_right':'<?php echo $data['wd_search_product_icon_right']; ?>',
                    'wd_search_product_icon_bottom':'<?php echo $data['wd_search_product_icon_bottom']; ?>',
                    'wd_search_product_enable':'<?php echo $data['wd_search_product_enable']; ?>',
                    }">
                <template #footer>
                    <?php
                    settings_fields('general');
                    do_settings_sections('warp-driven-setting');
                    submit_button(__('Save Settings', 'wd-vs-woo'));
                    ?>
                </template>
            </setting-page>
        </div>
        <?php
    }

    public function submit()
    {

    }
}