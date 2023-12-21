const {
  updateContact,
  getContact,
} = require("../controllers/contactController");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = require("express").Router();

router.get("/", getContact);
router.put("/update-contact/:id", verifyAdmin, updateContact);

module.exports = router;
