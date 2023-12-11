import mongoose from 'mongoose'

const proudctSchema = new mongoose.Schema({
    combos: {type:Array,require: true},
    canchita: {type:Array, require: true},
    bebidas: {type:Array, require: true},
    otros:{type:Array,require: true}
})

const Product = mongoose.model("Products",proudctSchema)
export default Product