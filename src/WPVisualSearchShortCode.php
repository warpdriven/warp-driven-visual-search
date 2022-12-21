<?php

namespace WarpDriven\WpCore;

class WPVisualSearchShortCode{

    public function __construct()
    {
        add_shortcode('visual-search', array($this, 'render'));

        add_shortcode('visual-search-post', array($this, 'post_render'));

        add_action('woocommerce_after_single_product', array($this, 'widget_related'));
    }

    public function get_products_html($product_id=0,$link=true,$target=''){
        $body="<div id='app' class='wd-wc-visual-search'>".
                "<h2>".sanitize_text_field(get_option("wd_search_product_list_title"))."</h2>".
                "<visual-search :product_id='".$product_id."'></visual-search>".
              "</div>";
        return $body;
    }

    public function render($atts = [], $content = null)
    {
        $product_id = (is_array($atts) && array_key_exists('product_id', $atts)) ? $atts['product_id'] : 0;
        $link = (is_array($atts) && array_key_exists('link', $atts)) ? $atts['link'] : true;
        $target = (is_array($atts) && array_key_exists('target', $atts)) ? $atts['target'] : '';
        return $this->get_products_html($product_id,$link,$target);
    }

    public function post_render($atts = [], $content = null){
        return $this->get_products_html(get_the_ID());
    }


    public function widget_related()
    {
        echo do_shortcode('[visual-search-post]');
    }


}