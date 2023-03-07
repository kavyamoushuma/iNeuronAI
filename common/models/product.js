// once you create the model, create a new .js file with module.export and then add remoteMethod APIs to expose them in the loopback swagger
module.exports = function(Product) {
    Product.createProduct = function(data, callback) {
      Product.create(data, callback);
    };
  
    Product.getProductById = function(id, callback) {
      Product.findById(id, callback);
    };
  
    Product.getAllProducts = function(callback) {
      Product.find({}, callback);
    };
  
    Product.updateProductById = function(id, data, callback) {
      Product.updateAll({id: id}, data, callback);
    };
  
    Product.deleteProductById = function(id, callback) {
      Product.destroyById(id, callback);
    };
  
    // Expose CRUD operations to the API
    Product.remoteMethod('createProduct', {
      http: {verb: 'post'},
      accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
      returns: {arg: 'product', type: 'object'}
    });
  
    Product.remoteMethod('getProductById', {
      http: {verb: 'get'},
      accepts: {arg: 'id', type: 'string', required: true},
      returns: {arg: 'product', type: 'object'}
    });
  
    Product.remoteMethod('getAllProducts', {
      http: {verb: 'get'},
      returns: {arg: 'products', type: 'array'}
    });
  
    Product.remoteMethod('updateProductById', {
      http: {verb: 'put'},
      accepts: [
        {arg: 'id', type: 'string', required: true},
        {arg: 'data', type: 'object', http: {source: 'body'}}
      ],
      returns: {arg: 'count', type: 'object'}
    });
  
    Product.remoteMethod('deleteProductById', {
      http: {verb: 'delete'},
      accepts: {arg: 'id', type: 'string', required: true},
      returns: {arg: 'count', type: 'object'}
    });
  };
  