const verifyAdmin = require("../middleware/verifyAdmin");
const {
  getContacts,
  addContact,
  updateContact,
} = require("../controllers/contactController");

const router = require("express").Router();

router.get("/", getContacts);
router.patch("/update-contact/:id", verifyAdmin, updateContact);
router.post("/add-contact", verifyAdmin, addContact);

module.exports = router;
