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
                    var $search = $('<span class="search_other"><svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 10V7C19 5.89543 19.8954 5 21 5H41C42.1046 5 43 5.89543 43 7V29C43 30.1046 42.1046 31 41 31H37" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="18" width="24" height="24" rx="2" fill="#ffffff" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 25V35" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 30H22" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
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