const express = require("express");

const purchaseController = require("../controllers/purchaseController");
const userController = require('../controllers/userController');

const authenticate = require("../auth/authenticate");

const router = express.Router();

router.get(
  "/premiumMembership",
  authenticate,
  purchaseController.purchasePremium
);

router.post('/updateTransactionStatus', authenticate, purchaseController.updateTransactionStatus);
router.get('/user/status', authenticate, userController.getUserStatus);

module.exports = router;
