<?php
/**
 * 基于WooCommerce ajax
 */
namespace WarpDriven\WpCore;
use WC_Shortcodes;
use WC_REST_Products_Controller;

use WarpDriven\PhpSdk\Helper;

class WPAjax extends WC_REST_Products_Controller
{

    protected $namespace = 'wd/v3';

    public function __construct()
    {
        add_action( 'rest_api_init', array( $this, 'register_rest_routes' ), 1 );
        $this->add_ajax();
    }

    public function get_items_permissions_check( $request ) {
		return true;
	}

   /**
	 * Get a collection of posts.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_items( $request ) {
		$query_args = $this->prepare_objects_query( $request );
		if ( is_wp_error( current( $query_args ) ) ) {
			return current( $query_args );
		}
		$query_results = $this->get_objects( $query_args );

		$objects = array();
		foreach ( $query_results['objects'] as $object ) {
			$data      = $this->prepare_object_for_response( $object, $request );
			$objects[] = $this->prepare_response_for_collection( $data );
		}

		$page      = (int) $query_args['paged'];
		$max_pages = $query_results['pages'];

		$response = rest_ensure_response( $objects );
		$response->header( 'X-WP-Total', $query_results['total'] );
		$response->header( 'X-WP-TotalPages', (int) $max_pages );

		$base          = $this->rest_base;
		$attrib_prefix = '(?P<';
		if ( strpos( $base, $attrib_prefix ) !== false ) {
			$attrib_names = array();
			preg_match( '/\(\?P<[^>]+>.*\)/', $base, $attrib_names, PREG_OFFSET_CAPTURE );
			foreach ( $attrib_names as $attrib_name_match ) {
				$beginning_offset = strlen( $attrib_prefix );
				$attrib_name_end  = strpos( $attrib_name_match[0], '>', $attrib_name_match[1] );
				$attrib_name      = substr( $attrib_name_match[0], $beginning_offset, $attrib_name_end - $beginning_offset );
				if ( isset( $request[ $attrib_name ] ) ) {
					$base = str_replace( "(?P<$attrib_name>[\d]+)", $request[ $attrib_name ], $base );
				}
			}
		}
		$base = add_query_arg( $request->get_query_params(), rest_url( sprintf( '/%s/%s', $this->namespace, $base ) ) );

		if ( $page > 1 ) {
			$prev_page = $page - 1;
			if ( $prev_page > $max_pages ) {
				$prev_page = $max_pages;
			}
			$prev_link = add_query_arg( 'page', $prev_page, $base );
			$response->link_header( 'prev', $prev_link );
		}
		if ( $max_pages > $page ) {
			$next_page = $page + 1;
			$next_link = add_query_arg( 'page', $next_page, $base );
			$response->link_header( 'next', $next_link );
		}

		return $response;
	}

    /**
	 * Register REST API routes.
	 */
	public function register_rest_routes() {
        $this->register_routes();
	}

    function add_ajax()
    {
        $ajax_events = array(
            'init_products',
            'get_vs_init_status',
            'get_woo_product_html',
            'get_woo_products_html_by_vs',
            'get_woo_product_categories',
            'get_woo_products_by_category',
            'get_woo_product_list_html',
            'get_woo_product_handle_history',
        );
        foreach ($ajax_events as $ajax_event) {
            add_action('wp_ajax_wd_' . $ajax_event, array($this, $ajax_event));
            add_action('wp_ajax_nopriv_wd_' . $ajax_event, array($this, $ajax_event));
        }
    }

    /**
     * 获取单个产品html
     */
    public function get_woo_product_html()
    {
        wp_send_json(
            array(
                "html" => WC_Shortcodes::product(
                    array(
                        "sku" => $_POST["id"],
                        "id" => $_POST["sku"]
                    )
                )
            )
        );
    }

    /**
     * 从 visual search 获取产品列表
     */
    public function get_woo_products_html_by_vs()
    {

        $product_id = $_POST["product_id"];
        // 调用 visual search 
        $products = Helper::visual_search(WPCore::getApiKey(), $product_id);
        $ids = array();
        if (is_array($products)) {
            foreach ($products as $product) {
                array_push($ids, $product->product_id);
            }
        }
        $html = "";
        if (count($ids) > 0) {
            $html = WC_Shortcodes::products(
                array(
                    "ids" => join(",", $ids)
                )
            );
        }
        wp_send_json(
            array(
                "product_id" => $product_id,
                "count" => count($ids),
                "html" => $html
            )
        );
    }

    public function get_woo_product_categories()
    {
        $args = array(
            'taxonomy' => 'product_cat',
            'orderby' => 'name',
            'order' => 'asc',
            'count' => true,
            'pad_counts' => true,
        );
        $product_categories = get_terms($args);
        wp_send_json($product_categories);
    }

    public function get_woo_products_by_category()
    {
       $categories = $_POST['categories'];
        
        // $wc_rest_product = new WC_REST_Products_Controller();
        // $products = $wc_rest_product->prepare_object_for_response(array(),$_REQUEST);

        $products = $this->get_items($_REQUEST);

        // $products = array();
        // WC()->api->includes();
		// WC()->api->register_resources( new WC_API_Server( '/' ) );
        // foreach ($categories as $category) {
        //     $filter = array(
        //         'category' => $category,
        //         'limit' => 1000
        //     );
        //     $result = WC()->api->WC_API_Products->get_products(null,null,$filter,1);
        //     $products=array_merge($products,$result['products']);
        //     array_unique($products);
        // }        
        // wp_send_json($products);

    }
    /**
     * 查询商品清单 
     */
    public function get_woo_product_list_html()
    {
        $product_id = $_POST['product_id'];
        $body = "";
        $product_ids = array();
        if ($product_id) {
            $result = Helper::visual_search(WPCore::getApiKey(),$product_id);
            foreach ($result as $item) {
                array_push($product_ids,$item->product_id);
            }
            array_unique($product_ids);
            ob_start();
            foreach ($product_ids as $id) {
                $post_object = get_post($id);
                setup_postdata($GLOBALS['post'] = &$post_object);
                wc_get_template_part('content', 'product');
            }
            wp_reset_postdata();
            $body = ob_get_contents();
            ob_end_clean();
        }

        wp_send_json(array('html' => $body,"product_ids"=> join(',',$product_ids)));
    }

    /**
     * 查询图片出来历史记录
     */
    public function get_woo_product_handle_history()
    {
        $result = Helper::handle_history(WPCore::getApiKey(),$_POST['page_no'],$_POST['page_size']);
        wp_send_json($result);
    }

    /**
     * 初始化数据
     */
    public function init_products()
    {
        $products = $_POST['products'];
        $result = Helper::init_products(WPCore::getApiKey(),json_encode(array("items"=>$products)));
        wp_send_json($result);
    }

    /**
     * 查询当前
     */
    public function get_vs_init_status()
    {
        $result = Helper::get_vs_init_status(WPCore::getApiKey());
        wp_send_json($result);
    }

}