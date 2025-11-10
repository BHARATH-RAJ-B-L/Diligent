import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		description: { type: String, required: true },
		price: { type: Number, required: true, min: 0 },
		images: { type: [String], default: [] },
		category: { type: String, required: true, index: true },
		brand: { type: String, default: '' },
		imageUrl: { type: String, default: '' },
		countInStock: { type: Number, required: true, min: 0, default: 0 },
		stock: { type: Number, min: 0, default: 0 }, // alias for countInStock compatibility
		rating: { type: Number, min: 0, max: 5, default: 0 },
		numReviews: { type: Number, min: 0, default: 0 },
		isActive: { type: Boolean, default: true }
	},
	{ timestamps: true }
);

// keep stock in sync if one is set
productSchema.pre('save', function (next) {
	if (this.isModified('countInStock') && (this.stock === undefined || this.stock !== this.countInStock)) {
		this.stock = this.countInStock;
	}
	if (this.isModified('stock') && (this.countInStock === undefined || this.countInStock !== this.stock)) {
		this.countInStock = this.stock;
	}
	next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;


