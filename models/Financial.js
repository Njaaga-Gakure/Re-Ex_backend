const { Schema, model, Types } = require("mongoose");

const FinancialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    category: {
      type: String,
      enum: {
        values: [
          "food",
          "housing",
          "clothing",
          "recreation",
          "transport",
          "investment",
          "insurance",
          "wage",
          "education",
        ],
        message: "{VALUE} is not supported",
      },
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount"],
    },
    type: {
      type: String,
      enum: ["revenue", "expense"],
      default: "expense",
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = model("Financial", FinancialSchema);
