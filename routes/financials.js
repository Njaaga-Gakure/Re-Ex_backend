const express = require("express");
const router = express.Router();

const Financials = require("../controllers/financials");

router
  .route("/")
  .get(Financials.getAllFinancials)
  .post(Financials.createFinancial);
router
  .route("/:id")
  .get(Financials.getFinancial)
  .patch(Financials.updateFinancial)
  .delete(Financials.deleteFinancial);

module.exports = router;
