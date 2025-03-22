import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name ist erforderlich"], 
    trim: true, 
  },
  workshopName: {
    type: String,
    required: [true, "Name der Werkstatt ist erforderlich"], 
    trim: true, 
  },
  phone: {
    type: String,
    required: [true, "Mobilnummer ist erforderlich"],
    trim: true, 
  },
  email: {
    type: String,
    required: [true, "E-Mail-Adresse ist erforderlich"], 
    trim: true, 
    lowercase: true, 
    match: [/.+\@.+\..+/, "Bitte geben Sie eine gültige E-Mail-Adresse ein"], 
  },
  postalCode: {
    type: String,
    required: [true, "Postleitzahl ist erforderlich"], 
    trim: true, 
  },
  agreedToPrivacyPolicy: {
    type: Boolean,
    required: [true, "Sie müssen den Datenschutzbestimmungen zustimmen"], 
    validate: {
      validator: (value: boolean) => value === true, 
      message: "Sie müssen den Datenschutzbestimmungen zustimmen", 
    },
  },
}, { timestamps: true }); 



export default  mongoose.model('Consultation', contactSchema);;