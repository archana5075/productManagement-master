/**
 * Created by Archana on 10/18/2014.
 */
(function(){
    angular
        .module("common.services")
        .factory("productResource",["$resource",productResource]);

    function productResource($resource){
        return $resource("/api/products/:productId")
    }

}());

