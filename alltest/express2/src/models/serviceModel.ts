import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String },

    type: {
      type: String,
      enum: [
        'cloud',
        'networking',
        'security',
        'support',
        'web',
        'app',
        'other',
      ],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    price: { type: Number, required: true },
    currency: {
      type: String,
      enum: ['usd', 'eur', 'gbp', 'inr', 'other'],
    },
    notes: [{ type: String }],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Service', serviceSchema)
