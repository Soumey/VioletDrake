const router = require('express').Router()
var createError = require('http-errors')

const basketModel = require('../models/basket')







const emptyBasketCollection = (req, res, next) =>
{
    basketModel.deleteMany({}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        if(!data)
        {
            return next(createError(409,`Failed to empty basket collection`))
        }
    })
    
    return next()
}

const addNewProductTobasketCollection = (req, res, next) => {
  basketModel.create(
    {
      name: req.params.name,
      description: req.params.description,
      category: req.params.category,
      price: req.params.price,
      imageName: req.params.imageName,
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
        })
      
    }
  )
}

router.post(
  '/basket/add/:name/:description/:category/:price/:imageName',
  addNewProductTobasketCollection
)

router.get(`/basket`, (req, res) => 
{   
    basketModel.find((error, data) => 
    {
        res.json(data)
    })
})

router.get(`/basket/:name`, (req, res) => 
{
    basketModel.findOne(req.params.name, (error, data) => 
    {              
        res.json(data)
    })
})

// Read one record
router.get(`/basket/:id`, (req, res) => 
{
    basketModel.findById(req.params.id, (error, data) => 
    {              
        res.json(data)
    })
})

router.post(`/basket/reset_basket_collection`, emptyBasketCollection)

module.exports = router
