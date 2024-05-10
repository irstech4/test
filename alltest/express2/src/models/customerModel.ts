import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    company: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    source: {
      type: String,
      enum: [
        'referral',
        'website',
        'advertisement',
        'coldOutreach',
        'partner',
        'employeeReferral',
        'socialMedia',
        'contentMarketing',
        'other',
      ],
      default: 'other',
    },

    status: {
      type: String,
      enum: [
        'newLead',
        'contactedLead',
        'junkLead',
        'lostLead',
        'qualifiedLead',
        'preQualifiedLead',
        'unqualifiedLead',
        'prospect',
        'customer',
        'inactive',
      ],
      default: 'newLead',
    },

    industry: {
      type: String,
      enum: [
        'technology',
        'finance',
        'healthcare',
        'retail',
        'education',
        'other',
      ],
    },

    budget: {
      amount: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: 'INR',
      },
    },

    rating: {
      type: String,
      enum: [
        'acquired',
        'active',
        'marketFailed',
        'projectCancelled',
        'shutDown',
      ],
      default: 'active',
    },

    notes: [{ type: String }],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        startDate: Date,
        endDate: Date,
        status: {
          type: String,
          enum: ['active', 'pending', 'completed', 'canceled'],
          default: 'pending',
        },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model('Customer', customerSchema)
