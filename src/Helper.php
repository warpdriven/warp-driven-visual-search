<?php

namespace WarpDrivenWpCore;
use Dotenv\Dotenv;
class Helper
{
    private static $WARP_AI_HOST;

    public static function init()
    {
        
        $dotenv = Dotenv::createImmutable(dirname(__DIR__));

        $dotenv->safeLoad();

        $_ENV['WARP_MODEL'] = $_ENV['WARP_MODEL'] === 'STG'?"_".$_ENV['WARP_MODEL']:'';
        
        self::$WARP_AI_HOST = $_ENV['WARP_AI_HOST'.$_ENV['WARP_MODEL']];
        
    }

    /**
     * Query similar products according to product ID
     *
     * $search_url      address
     * $api_key         authorization key
     * $website_code    Visual Search Website identity
     * $product_id      product ID
     *
     * return
     * [
     *      {
     *          "product_id": 956,
     *          "distance": 0.11267366409301759,
     *          "recall_type": "1"
     *      },
     *      ... ...
     * ]
     */
    public static function visual_search($api_key, $product_id)
    {
        $search_url =  self::$WARP_AI_HOST.'/vs/internal_search';
        $search_url .= '?' . http_build_query(array(
                    'shop_variant_id' => $product_id
                )
            );
        $response = wp_remote_post($search_url,array("headers"=>array("X-API-Key"=>$api_key),"timeout"=>1200));
        if (!is_wp_error($response)) {
            $result = json_decode($response['body']);
            if(!is_array($result)){
                return array(); 
            };
            return $result;
        }else{
            return array();
        }
    }

}
