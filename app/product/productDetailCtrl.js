/**
 * Created by archie on 10/28/14.
 */
(function(){
    "use strict";
        angular
        .module("productManagement")
        .controller("ProductDetailCtrl",["product", ProductDetailCtrl]);
        function ProductDetailCtrl(product) {
             var vm = this;

            vm.product = product;


            vm.title = "Product Detail: " + vm.product.productName;

            if(vm.product.tags){
                vm.product.tagList = vm.product.tags.toString();
            }

        }

}());