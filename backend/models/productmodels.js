const mongoose = require('mongoose');


// Define the Product schema
const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model's ObjectId
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: './images/No.png' 
    },
    color: {
        type:String
    },
    size: {
        type: String
    },
    brand: String,
    quantity: {
        type: Number,
        required: true
    },
    storePrice: {
        type: Number,
        required: true
    }
});

// Create and export the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
