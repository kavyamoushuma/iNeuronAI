// once you create model and remote APIs, to use those CRUD operations define the function
module.exports = function(app) {
    var Product = app.models.Product;  // all models will be stored in app.models
  
    // Define CRUD routes (end points) for the Product model
    app.post('/api/products', Product.createProduct);       
    app.get('/api/products/:id', Product.getProductById);
    app.get('/api/products', Product.getAllProducts);
    app.put('/api/products/:id', Product.updateProductById);
    app.delete('/api/products/:id', Product.deleteProductById);
  };
  