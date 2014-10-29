/**
 * Created by Archana on 10/18/2014.
 */
(function(){
    var app = angular
        .module("productResourceMock",
                 ["ngMockE2E"]  );

        app.run(function($httpBackend) {

            var products = [
                {
                    "productId": 1,
                    "productName": "Leaf Rake",
                    "productCode": "YUN-0114",
                    "releaseDate": "Oct 12, 2001",
                    "description": "Leaf Rake with 48 handle",
                    "cost": 9.00,
                    "price": 20.95,
                    "category": "garden",
                    "tags": ["leaf", "tool"],
                    "imageUrl": "https://openclipart.org/image/800px/svg_to_png/26215/Leaf_Rake.png"

                },
                {
                    "productId": 2,
                    "productName": "Hammer",
                    "productCode": "BND-0239",
                    "releaseDate": "Jan 19, 2013",
                    "description": "Hammer",
                    "cost": 9.00,
                    "price": 9.95,
                    "category": "garden",
                    "tags": ["hammer", "tool"],
                    "imageUrl": "https://openclipart.org/image/800px/svg_to_png/73/rejon_Hammer.png"

                },
                {
                    "productId": 3,
                    "productName": "Garden Cart",
                    "productCode": "MXD-0488",
                    "releaseDate": "Nov 04, 2013",
                    "description": "Garden Cart",
                    "cost": 9.00,
                    "price": 19.95,
                    "category": "garden",
                    "tags": ["Garden", "Cart"],
                    "imageUrl": "https://openclipart.org/image/800px/svg_to_png/58471/garden_cart.png"

                },
                {
                    "productId": 4,
                    "productName": "Saw",
                    "productCode": "CGD-0482",
                    "releaseDate": "Oct 01, 2011",
                    "description": "Saw",
                    "cost": 9.00,
                    "price": 8.95,
                    "category": "garden",
                    "tags": ["saw", "tool"],
                    "imageUrl": "https://openclipart.org/image/800px/svg_to_png/196255/Saw.png"

                },
                {
                    "productId": 5,
                    "productName": "Video Game Controller",
                    "productCode": "GMD-0206",
                    "releaseDate": "Apr 19, 2010",
                    "description": "Video Game Controller",
                    "cost": 9.00,
                    "price": 35.95,
                    "category": "Electronics",
                    "tags": ["Video", "game"],
                    "imageUrl": "https://openclipart.org/image/800px/svg_to_png/191485/controller_icon.png"

                }

            ];

            var productUrl = "/api/products"
            $httpBackend.whenGET(productUrl).respond(products);

            var editingRegEx = new RegExp(productUrl + "/[0-9][0-9]*", '');

            $httpBackend.whenGET(editingRegEx).respond(function (method, url, data) {
                var product = {"productId": 0};
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parameters[length - 1];

                if (id > 0) {
                    for (var i = 0; i < products.length; i++) {
                        if (products[i].productId == id) {
                            product = products[i];
                            break;
                        }
                    }
                }
                return [200, product, {}];
            });

            $httpBackend.whenPOST(productUrl).respond(function(method,url,data){
                var product = angular.fromJson(data);

                if(!product.productId){
                    //new  product ID
                    product.productId = products[products.length - 1].productId + 1;
                    products.push(product);
                }
                else{
                    // Updated Product
                    for(var i=0; i <products.length;i++){
                        if(products[i].productId == product.productId){
                            products[i] = product;
                            break;
                        }
                    }
                }
                return [200,product,{}];

            });

            $httpBackend.whenGET(/app/).passThrough();


        });

}());