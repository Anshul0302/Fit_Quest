// routes/store.js (with i18n translation)
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const Product = require("../models/Product");
const Order = require("../models/Order");
const sendNotification = require("../utils/sendNotification");
const { isAdmin } = require("../middleware/adminCheck");

// ✅ Add a new product (Admin only)
router.post("/product/add", verifyToken, isAdmin, async (req, res) => {
  console.log("User:", req.user); // Log user information
  const { name, description, price, category, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ msg: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("❌ Add Product Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/product/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Fetch All Products Error:", err.message);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ msg: res.__("store.product_not_found") });
    res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err.message);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

router.put("/product/update/:id", verifyToken, async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image },
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ msg: res.__("store.product_not_found") });
    res.json({ msg: res.__("store.product_updated"), product: updatedProduct });
  } catch (err) {
    console.error("Update Product Error:", err.message);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

router.delete("/product/delete/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ msg: res.__("store.product_not_found") });
    res.json({ msg: res.__("store.product_deleted") });
  } catch (err) {
    console.error("Delete Product Error:", err.message);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

router.get("/product-by-filter", async (req, res) => {
  const { category } = req.query;

  let filter = {};
  if (category && category !== "all") filter.category = category;
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: res.__("store.invalid_category") });
  }
});

// router.post("/order", verifyToken, async (req, res) => {
//   const { products, shippingDetails } = req.body;
//   if (!products || !Array.isArray(products)) {
//     return res.status(400).json({ msg: "Products array is required" });
//   }
//   try {
//     const productIds = products.map((item) => item.product);
//     const productDocs = await Product.find({ _id: { $in: productIds } });
//     let total = 0;
//     products.forEach((item) => {
//       const product = productDocs.find((p) => p.id === item.product);
//       total += product ? product.price * item.quantity : 0;
//     });
//     const order = new Order({
//       user: req.user.id,
//       products,
//       total,
//       shippingDetails,
//     });
//     await order.save();
//     console.log("✅ Order saved for user:", req.user.id);

//     console.log("📨 About to send notification...");

//     await sendNotification({
//       userId: req.user.id,
//       title: "Order Placed ✅",
//       message: `Your order has been placed and is being processed.`,
//       type: "order",
//     });

//     console.log("📨 Notification function called");

//     res.json({ msg: res.__("store.order_created"), order });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: res.__("store.server_error") });
//   }
// });

router.post("/order/create", verifyToken, async (req, res) => {
  const { products, shippingDetails } = req.body;
  try {
    let total = 0;
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (product) total += product.price * item.quantity;
    }

    const order = new Order({
      user: req.user.id,
      products,
      total,
      shippingDetails,
    });
    await order.save();

    // ✅ Logs for debugging
    console.log("✅ Order saved for user:", req.user.id);
    console.log("📨 About to send notification...");

    // ✅ Notification
    await sendNotification({
      userId: req.user.id,
      title: "Order Placed ✅",
      message: `Your order has been placed and is being processed.`,
      type: "order",
    });

    console.log("📨 Notification function called");

    res.status(201).json({ msg: res.__("store.order_created"), order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

router.get("/order/user", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "products.product"
    );
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

// ✅ This MUST come first
router.get("/order/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ❌ This must come AFTER `/order/all`
router.get("/order/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.product");
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.put("/order/update/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ msg: res.__("store.order_not_found") });
    res.json({ msg: res.__("store.order_updated"), order: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

router.delete("/order/cancel/:id", verifyToken, async (req, res) => {
  try {
    const canceled = await Order.findByIdAndDelete(req.params.id);
    if (!canceled)
      return res.status(404).json({ msg: res.__("store.order_not_found") });
    res.json({ msg: res.__("store.order_cancelled") });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: res.__("store.server_error") });
  }
});

module.exports = router;
