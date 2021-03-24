import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = Schema({
    name: { 
      type: String, 
      required: true 
    },
    rating: { 
      type: Number, 
      default: 0 
    },
    comment: { 
      type: String, 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema({
  name: {
       type: String, 
       required: true 
    },
  image: { 
      type: String, 
      required: true 
    },
  brand: { 
      type: String, 
      required: true 
    },
  price: { 
      type: Number, 
      default: 0, 
      required: true 
    },
  category: { 
      type: String, 
      required: true 
    },
  countInStock: { 
      type: Number, 
      default: 0, 
      required: true 
    },
  description: { 
      type: String, 
      required: true 
    },
  rating: { 
      type: Number, 
      default: 0, 
      required: true 
    },
  numOfReviews: { 
      type: Number, 
      default: 0, 
      required: true 
    },
  reviews: [reviewSchema]
})

productSchema.methods.updateProduct = function(product) {
  this.name = product.name;
  this.description = product.description;
  this.price = product.price
  this.brand = product.brand
  this.category = product.category;
  this.countInStock = product.countInStock;
  this.image = product.image;

  this.save();
  return this;
}

export default mongoose.model('Product', productSchema)