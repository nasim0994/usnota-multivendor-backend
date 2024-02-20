const { addTheme, getThemes, updateTheme } = require("../controllers/themeController");


const router = require("express").Router();

router.post("/add-theme", addTheme);
router.get("/get-themes", getThemes);
router.patch("/update-theme/:id", updateTheme);

module.exports = router;
