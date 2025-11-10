import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
	{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		name: { type: String, required: true },
		imageUrl: { type: String, default: '' },
		price: { type: Number, required: true },
		qty: { type: Number, required: true, min: 1 }
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		items: { type: [orderItemSchema], required: true },
		shippingAddress: {
			fullName: { type: String, required: true },
			addressLine1: { type: String, required: true },
			addressLine2: { type: String, default: '' },
			city: { type: String, required: true },
			state: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true }
		},
		itemsTotal: { type: Number, required: true },
		shippingFee: { type: Number, required: true },
		tax: { type: Number, required: true },
		grandTotal: { type: Number, required: true },
		status: { type: String, enum: ['created', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'created' }
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;


