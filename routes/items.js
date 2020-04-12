const express = require("express")
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get("/api/items/:id", itemController.getItems);
router.post("/api/items", itemController.createItem);
router.delete("/api/items/:id", itemController.removeItem);
router.get("/api/items/:id", itemController.getItem);
router.post("/api/items/update/:id", itemController.updateItem);
router.delete("/api/items/all/:id", itemController.removeAll);

module.exports = router;