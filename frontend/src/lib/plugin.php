<?php
/*
Plugin Name: Vite Wordpress
Plugin URI: https://gitee.com/Swz082421/wordpress-vite
Description: Wordpress plugin for vite
Author: YangLee
Author URI: https://gitee.com/Swz082421
Version: 1.0.0
*/

// Hook to add the custom menu
add_action('admin_menu', 'custom_admin_menu');

// Function to create the custom menu
function custom_admin_menu() {
    // Add a new top-level menu
    add_menu_page(
        'Vite Wordpress Settings',          // Page title
        'Vite Wordpress',          // Menu title
        'manage_options',       // Capability required to access the menu
        'custom-menu-page',     // Menu slug
        'custom_menu_page',     // Callback function to display the menu content
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iNjAwLjAwMDAwMHB0IiBoZWlnaHQ9IjYwMC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDYwMC4wMDAwMDAgNjAwLjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsNjAwLjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iI2E3YWFhZCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTE0OTUgNDg0MCBsLTI4MCAtMjgwIDEwNTAgMCBjNjUzIDAgMTA5MyAtNCAxMTY1IC0xMSA2MTkgLTU2IDEwNzcKLTM0NSAxMjk5IC04MTkgMTg5IC00MDUgMTkyIC05NTMgNiAtMTM0MiAtMTggLTM4IC0zMCAtNjggLTI3IC02OCAzIDAgNDkgMzAKMTA0IDY2IDMxMSAyMDcgNTE2IDUxNyA1OTkgOTA0IDIwIDkxIDIzIDEzNSAyMyAzMjUgMSAyNDIgLTkgMzE1IC02NSA1MDAKLTE0NiA0NzYgLTUxNiA4MTQgLTEwMzggOTQ2IC0yMzAgNTkgLTIzOSA1OSAtMTQ0OSA1OSBsLTExMDcgMCAtMjgwIC0yODB6Ii8+CjxwYXRoIGQ9Ik04NDAgNDE4NSBsLTI4NSAtMjg1IDEwNzggMCBjNjc0IDAgMTExNCAtNCAxMTc1IC0xMCA3NjUgLTgyIDEyNjMKLTUxOCAxMzg4IC0xMjE1IDIwIC0xMTEgMjUgLTQyOCA4IC01MDAgbC0xMCAtNDAgLTc0IC0xNCBjLTYxIC0xMSAtMjkyIC0xNQotMTIwNSAtMTggbC0xMTMxIC00IC0yODQgLTI4NCAtMjg1IC0yODUgMTA0MCAwIGM2MDMgMCAxMDg4IDQgMTE1NSAxMCAzMjUgMjgKNTk0IDExOCA4MzQgMjc3IDEyOCA4NSAyMTggMTc0IDI5NSAyOTIgMTg0IDI4MCAyNjQgNjA2IDI0MCA5NzMgLTI1IDM5MCAtMTYzCjcwNCAtNDE5IDk1MiAtMjU2IDI0OSAtNTk1IDM5MCAtMTAyNSA0MjYgLTcxIDYgLTU0OSAxMCAtMTE2NSAxMCBsLTEwNDUgMAotMjg1IC0yODV6Ii8+CjxwYXRoIGQ9Ik0zOTQ1IDE2MDkgYy0xNjkgLTgxIC0zOTggLTEzOSAtNjIwIC0xNTggLTczIC03IC01MjYgLTExIC0xMTYwIC0xMQpsLTEwNDAgMCAtMjgwIC0yODAgLTI4MCAtMjgwIDEwOTIgMCBjMTE5NiAwIDEyMDcgMCAxNDM2IDU5IDM5MiAxMDIgNzEzIDMzMQo5MDcgNjQ5IDE4IDI5IDMxIDU0IDI5IDU2IC0yIDIgLTQwIC0xNCAtODQgLTM1eiIvPgo8L2c+Cjwvc3ZnPgo=' // Icon (optional)
    );
}

// Function to display the custom menu content
function custom_menu_page() {
    echo '<div id="warpdriven-recs-admin"></div>';
}

function load_assets($hook)
{
    $ver = '0.0.1';
    // wp_enqueue_script('vite', 'http://localhost:3002/vite-dev-react.js', array(), $ver, true);
    wp_enqueue_style('warpdriven-recs-style', plugin_dir_url(__FILE__) . 'dist/style.css', array(), $ver, false);
    wp_enqueue_script('warpdriven-recs-main', plugin_dir_url(__FILE__) . 'dist/warpdriven-recs-main.js', array(), $ver, true);
}

add_action('admin_enqueue_scripts', 'load_assets');
add_action('wp_enqueue_scripts', 'load_assets');

function to_script_module($tag, $handle)
{
    if (strpos($tag, 'warpdriven-recs-main.js') !== false) {
        $tag = str_replace('<script', '<script type="module"', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'to_script_module', 10, 2);

// Define the shortcode
function custom_shortcode_function() {

    $product_id = get_the_ID();
    $product = wc_get_product($product_id);
    $json_data = json_encode(array(
        'id' => $product_id,
        'title' => $product->get_name(),
        // 'image_url' => $product->get_image_url(),
        "price" => $product->get_price(),
        'url' => $product->get_permalink(),
        // "description" => $product->get_description(),
        'variations' => $product->get_children()
    ));

    return '<script id="warpdriven-recs-json-product" type="application/json">'
            .$json_data.
            '</script>'.
            '<div id="warpdriven-recs-vsr"></div>';
}
add_shortcode('warpdriven-recs-vsr', 'custom_shortcode_function');

// Render shoort code
function render_warpdriven_visual_similar() {
    echo do_shortcode('[warpdriven-recs-vsr]');
}
add_action('woocommerce_after_single_product', 'render_warpdriven_visual_similar');

// Ajax
function warpdriven_recs_settings() {
    $request_method = $_SERVER['REQUEST_METHOD'];
    $warpdriven_settings_post_type = 'warpdriven-settings';
    $posts = get_posts(array(
        'post_type' => $warpdriven_settings_post_type
    ));
    $post = $posts[0];

    if ('POST' === $request_method) {
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        if($post instanceof WP_Post){
            update_post_meta($post->ID, 'api_key', $data["api_key"]);
            update_post_meta($post->ID, 'custom_js', $data["custom_js"]);
            update_post_meta($post->ID, 'data_server', $data["data_server"]);
            update_post_meta($post->ID, 'data_server_key', $data["data_server_key"]);
            update_post_meta($post->ID, 'is_test_mode', $data["is_test_mode"]);

            wp_send_json(array(
                'api_key' => get_post_meta($post->ID, 'api_key', true),
                'custom_js' => get_post_meta($post->ID, 'custom_js', true),
                'data_server' => get_post_meta($post->ID, 'data_server', true),
                'data_server_key' => get_post_meta($post->ID, 'data_server_key', true),
                'is_test_mode' => boolval(get_post_meta($post->ID, 'is_test_mode', true)),
            ));
            exit();
            return;
        }

        // Insert post
        wp_insert_post(array(
            'post_title'    => 'WarpDriven Settings',
            'post_content'  => 'Your post content goes here.',
            'post_status'   => 'publish', // 可以是 'publish', 'draft', 'pending', 'private'
            'post_author'   => 1, // 作者的用户 ID
            'post_type'     => $warpdriven_settings_post_type, // 可以是 'post', 'page', 或自定义的内容类型
        ));

        // Insert meta fields
        add_post_meta($post->ID, "api_key", $data['api_key'], true);
        add_post_meta($post->ID, "custom_js", $data['custom_js'], true);
        add_post_meta($post->ID, "data_server", $data['data_server'], true);
        add_post_meta($post->ID, "data_server_key", $data['data_server_key'], true);
        add_post_meta($post->ID, "is_test_mode", $data['is_test_mode'], true);

        wp_send_json(array(
            'api_key' => get_post_meta($post->ID, 'api_key', true),
            'custom_js' => get_post_meta($post->ID, 'custom_js', true),
            'data_server' => get_post_meta($post->ID, 'data_server', true),
            'data_server_key' => get_post_meta($post->ID, 'data_server_key', true),
            'is_test_mode' => boolval(get_post_meta($post->ID, 'is_test_mode', true)),
        ));
        exit();
        return;
    }

    if ('GET' === $request_method) {

        if($post instanceof WP_Post){
            wp_send_json(array(
                'api_key' => get_post_meta($post->ID, 'api_key', true),
                'custom_js' => get_post_meta($post->ID, 'custom_js', true),
                'data_server' => get_post_meta($post->ID, 'data_server', true),
                'data_server_key' => get_post_meta($post->ID, 'data_server_key', true),
                'is_test_mode' => boolval(get_post_meta($post->ID, 'is_test_mode', true)),
            ));
            exit();
            return;
        }

        // Insert post
        wp_insert_post(array(
            'post_title'    => 'WarpDriven Settings',
            'post_content'  => 'Your post content goes here.',
            'post_status'   => 'publish', // 可以是 'publish', 'draft', 'pending', 'private'
            'post_author'   => 1, // 作者的用户 ID
            'post_type'     => $warpdriven_settings_post_type, // 可以是 'post', 'page', 或自定义的内容类型
        ));

        // Insert meta fields
        add_post_meta($post->ID, "api_key", '');
        add_post_meta($post->ID, "custom_js", '');
        add_post_meta($post->ID, "data_server", '');
        add_post_meta($post->ID, "data_server_key", '');
        add_post_meta($post->ID, "is_test_mode", true);

        wp_send_json(array(
            'api_key' => get_post_meta($post->ID, 'api_key', true),
            'custom_js' => get_post_meta($post->ID, 'custom_js', true),
            'data_server' => get_post_meta($post->ID, 'data_server', true),
            'data_server_key' => get_post_meta($post->ID, 'data_server_key', true),
            'is_test_mode' => boolval(get_post_meta($post->ID, 'is_test_mode', true)),
        ));
        exit();
        return;
    }
}
add_action("wp_ajax_warpdriven_recs_settings", "warpdriven_recs_settings");