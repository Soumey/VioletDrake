const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
   {
        name: {type: String, required:true},
        description: {type: String, required:true},
        category: {type: String,required:true}, 
        price: {type: Number, default:parseFloat(), required:true}, 
        stock: {type: Number, default:parseInt(), required:true},       
        imageName: {type:String, required:true}
   },
   {
       collection: `products`
   })

module.exports = mongoose.model(`products`, productsSchema)

