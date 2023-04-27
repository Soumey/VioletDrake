const mongoose = require(`mongoose`)

let basketSchema = new mongoose.Schema(
   {
        name: {type: String, required:true},
        description: {type: String, required:true},
        category: {type: String,required:true}, 
        price: {type: Number, default:parseFloat(), required:true},        
        imageName: {type:String, required:true}
   },
   {
       collection: `basket`
   })

module.exports = mongoose.model(`basket`, basketSchema)