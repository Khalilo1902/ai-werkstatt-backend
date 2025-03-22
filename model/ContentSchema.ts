import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
      required: true,
    },
  ],
}, { timestamps: true });

 

export default mongoose.model('Content', contentSchema);
