const express = require("express");

const purchaseController = require("../controllers/purchaseController");

const authenticate = require("../auth/authenticate");

const router = express.Router();

router.get(
  "/premiumMembership",
  authenticate,
  purchaseController.purchasePremium
);

router.post('/updateTransactionStatus', authenticate, purchaseController.updateTransactionStatus);

module.exports = router;
