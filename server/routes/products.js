const router = require('express').Router()
var createError = require('http-errors')

const productsModel = require('../models/products')







const addNewProductToProductsCollection = (req, res, next) => {
  productsModel.create(
    {
      name: req.params.name,
      description: req.params.description,
      category: req.params.category,
      price: req.params.price,
      imageName: req.params.imageName,
      stock: req.params.stock,
    },
    (err, data) => {
      if (err) {
        return next(err)
      }

      

        return res.json({
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          imageName: data.imageName,
          stock: data.stock,
        })
      
    }
  )
}

router.post(
  '/products/add/:name/:description/:category/:price/:stock/:imageName',
  addNewProductToProductsCollection
)

router.get(`/products`, (req, res) => 
{   
    productsModel.find((error, data) => 
    {
        res.json(data)
    })
})


// Read one record
router.get(`/products/:id`, (req, res) => 
{
    productsModel.findById(req.params.id, (error, data) => 
    {              
        res.json(data)
    })
})

router.get(`/products/:name`, (req, res) => 
{
    productsModel.findOne(req.params.name, (error, data) => 
    {              
        res.json(data)
    })
})

router.delete('/products/:id', (req, res, next) => {
  productsModel.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) {
          return next(err);
      }
      res.json(data);
  });
});

router.patch('/products/:id', (req, res, next) => {
  productsModel.findByIdAndUpdate(req.params.id, {$inc: {stock: -1}}, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});

router.patch('/products/:name', (req, res, next) => {
  productsModel.findOneAndUpdate(req.params.name, {$inc: {stock: 1}}, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});

module.exports = router

