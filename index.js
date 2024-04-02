const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5001;

//--------- Admin routers
const adminRoutes = require("./routes/adminRoutes");
const logoRouter = require("./routes/logoRoutes");
const faviconRouter = require("./routes/faviconRoutes");
const contactRouter = require("./routes/contactRoutes");
const bannerRouter = require("./routes/bannerRoutes");
const aboutRouter = require("./routes/aboutRoutes");
const categoryRouter = require("./routes/categoriesRoutes");
const campaignBannerRouter = require("./routes/campaignBannerRoutes");
const topCampaignBannerRouter = require("./routes/TopCampaignBannerRoutes");
const brandRouter = require("./routes/brandRoutes");
const couponRouter = require("./routes/couponRoutes");
const seoRouter = require("./routes/seoRoutes");
const shippingConfigRouter = require("./routes/shippingConfigRoutes");
const businessInfoRoutes = require("./routes/businessInfoRoutes");
const themeRouter = require("./routes/themeRoutes");

const flashDealRouter = require("./routes/flashDealRoutes");

//------------------- User routers
const userRoutes = require("./routes/userRoutes");
const reviewRouter = require("./routes/reveiwRoutes");

const orderRouter = require("./routes/orderRoutes");
const paymentRouter = require("./routes/paymentRoute");

//------------------- Seller routers
const sellerRoutes = require("./routes/seller/seller.routes");
const productRouter = require("./routes/seller/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//---------------------------------
// Connect Database
//----------------------------------
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

//---------------------------------
// Admin Routes
//----------------------------------
app.use("/admin", adminRoutes);
app.use("/logo", logoRouter);
app.use("/favicon", faviconRouter);
app.use("/contact", contactRouter);
app.use("/banner", bannerRouter);
app.use("/about", aboutRouter);
app.use("/category", categoryRouter);
app.use("/campaignBanner", campaignBannerRouter);
app.use("/topCampaignBanner", topCampaignBannerRouter);
app.use("/brand", brandRouter);
app.use("/coupon", couponRouter);
app.use("/seo", seoRouter);
app.use("/shippingConfig", shippingConfigRouter);

//---------------------------------
//
//----------------------------------
app.use("/flash-deal", flashDealRouter);

//---------------------------------
// User Routes
//----------------------------------
app.use("/user", userRoutes);
app.use("/review", reviewRouter);

app.use("/order", orderRouter);
app.use("/payment", paymentRouter);

//----------------------------------
// General
//----------------------------------
app.use("/businessInfo", businessInfoRoutes);
app.use("/theme", themeRouter);

//----------------------------------
// Seller routers
//----------------------------------
app.use("/seller", sellerRoutes);
app.use("/product", productRouter);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
