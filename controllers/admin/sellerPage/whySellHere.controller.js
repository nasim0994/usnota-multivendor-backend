const fs = require("fs");
const WhySellHere = require("../../../models/admin/sellerPage/whySellHere.model");

exports.createWhySellHere = async (req, res) => {
  const icon = req?.file?.filename;

  try {
    const data = req?.body;

    const whySellHereInfo = {
      ...data,
      icon,
    };

    const result = await WhySellHere.create(whySellHereInfo);

    res.status(201).json({
      success: true,
      message: "Why Sell Here add success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });

    if (icon) {
      fs.unlink(`./uploads/sellerWhySellHere/${icon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

exports.getWhySellHere = async (req, res) => {
  try {
    const result = await WhySellHere.find();

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Why Sell Here not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Why Sell Here get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getWhySellHereById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await WhySellHere.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Why Sell Here not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Why Sell Here get success",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateWhySellHere = async (req, res) => {
  const id = req?.params?.id;
  const icon = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await WhySellHere.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Why Sell Here not found",
      });
    }

    let newData;

    if (icon) {
      newData = {
        ...data,
        icon,
      };
    } else {
      newData = { ...data };
    }

    const result = await WhySellHere.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Why Sell Here not updated",
      });
    }

    fs.unlink(`./uploads/sellerWhySellHere/${isExist.icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "Why Sell Here updated success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    if (icon) {
      fs.unlink(`./uploads/sellerWhySellHere/${icon}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
};

exports.deleteWhySellHere = async (req, res) => {
  const { id } = req.params;

  try {
    const whySellHere = await WhySellHere.findById(id);
    if (!whySellHere) {
      return res.status(400).json({
        success: false,
        error: "Why Sell Here not found",
      });
    }

    await WhySellHere.findByIdAndDelete(id);

    fs.unlink(`./uploads/sellerWhySellHere/${whySellHere?.icon}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(200).json({
      success: true,
      message: "Why Sell Here delete success",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
