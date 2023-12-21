const Contact = require("../models/contactModel");

exports.updateContact = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(400).json({
        success: false,
        error: "contact not found",
      });
    }

    await Contact.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});

    res.status(200).json({
      success: true,
      message: "All contacts",
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addContact = async (req, res) => {
  try {
    const data = req?.body;

    const result = await Contact.create(data);

    res.status(200).json({
      success: true,
      message: "Contact created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
