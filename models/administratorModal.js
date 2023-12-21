const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdministratorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

AdministratorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Administrator = mongoose.model("Administrator", AdministratorSchema);

module.exports = Administrator;
