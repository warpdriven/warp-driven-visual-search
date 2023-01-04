require('./boot');
import {getProductListHtml} from "../../../node_modules/wd-vue-lib/src/api/wd-common-api"
(function ($) {

    function getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) 
            return unescape(r[2]);

        return null; //返回参数值
    } 

    var getNumberByClassName = function(classNames,search){
        var number = -1;
        classNames = classNames?classNames.split(" "):[];
        $.each(classNames,function(index,className){
            if(className&&className.indexOf(search)===0){
                number=parseInt(className.replace(search,""));
                return false;
            }
        });
        return number;
    }
    

    var search_product = function($product){
        if($product){
            var classNames = $product.attr("class");
            var pro_id = getNumberByClassName(classNames,"post-");
            if(pro_id > -1){
                getProductListHtml({product_id:pro_id||0}).then(data=>{
                    if(data&&data.html){
                        $product.after(data.html)
                        reload_products($product.parents(".products"));
                    }
                });
            }
        }
    }

    var reload_products =function($products){
        if($products&&wd_woo_plugin_vs.wd_search_product_enable==='on'){
            var pro_num = getNumberByClassName($products.attr("class"),"columns-");
            $(".product",$products).each(function(index,product){
                var $this = $(this);
                if($(".search_other",$this).length == 0){
                    var $search = $('<span class="search_other"><?xml version="1.0" encoding="UTF-8"?><svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 12.4316V7.8125C13 6.2592 14.2592 5 15.8125 5H40.1875C41.7408 5 43 6.2592 43 7.8125V32.1875C43 33.7408 41.7408 35 40.1875 35H35.5163" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M32.1875 13H7.8125C6.2592 13 5 14.2592 5 15.8125V40.1875C5 41.7408 6.2592 43 7.8125 43H32.1875C33.7408 43 35 41.7408 35 40.1875V15.8125C35 14.2592 33.7408 13 32.1875 13Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/></svg></span>');
                    var icon_css = wd_woo_plugin_vs.icon_css;
					if(getUrlParam("test")){
                        icon_css = wd_woo_plugin_vs.test_icon_css;
                    }
                    $.each(icon_css,function(key,value){
                        if(value){
                            if(key==="size"){
                                $search.css("width",value);
                                $search.css("height",value);
                            }else{
                                $search.css(key,value);
                            }
                        }
                    });
                    $this.find("img").parent().append($search);
                }

                if(pro_num > -1){
                     $this.removeClass("first").removeClass("instock").removeClass("last");

                     if(index%pro_num == 0){
                        $this.addClass("first");
                     }else if(index%pro_num == pro_num-1){
                        $this.addClass("last");
                     }else{
                        $this.addClass("instock");
                     }
                }
                
            });
           
        }
    }

    $(".products",document).not(".related").each(function(index,product){
        if($(this).parents(".related").length==0){
            reload_products($(this));
        }
    });
    
    $(".products",document).on("click",".product .search_other",function(e){
        e.stopPropagation();
        search_product($(this).parents(".product"));
        return false;
    });

})(jQuery);