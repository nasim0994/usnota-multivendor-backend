const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
    },
    facebookGroupLink: {
      type: String,
    },
    facebookPageLink: {
      type: String,
    },
    instagramLink: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
  },
  { timestamps: false }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
