import mongoose from 'mongoose'
import { normalize } from 'path'

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [
    {
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'fulfilled', 'canceled'],
    default: 'pending',
  },
  total: {
    type: Number,
    required: true,
  },
  notes: [{ type: String }],

} , { timestamps: true})

export default mongoose.model('Order', orderSchema)
