const Financial = require("../models/Financial");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

class Financials {
  static async createFinancial(req, res) {
    const { userId } = req.user;
    const financial = await Financial.create({ ...req.body, userId });
    res.status(StatusCodes.CREATED).json({ financial });
  }

  static async getAllFinancials(req, res) {
    const { userId } = req.user;
    const financials = await Financial.find({ userId }).sort("createdAt");
    res.status(StatusCodes.OK).json({ financials, count: financials.length });
  }

  static async getFinancial(req, res) {
    const {
      user: { userId },
      params: { id: financialId },
    } = req;
    const financial = await Financial.findOne({ _id: financialId, userId });
    if (!financial) throw new NotFoundError(`No job with id: ${financialId}`);
    res.status(StatusCodes.OK).json({ financial });
  }

  static async updateFinancial(req, res) {
    const {
      user: { userId },
      params: { id: financialId },
      body: { name, description, amount },
    } = req;
    if (name === "" || description === "" || amount === "") {
      throw new BadRequestError("Fields cannot be empty");
    }
    const financial = await Financial.findOneAndUpdate(
      {
        _id: financialId,
        userId,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!financial) throw new NotFoundError(`No job with id: ${financialId}`);
    res.status(StatusCodes.OK).json({ financial });
  }

  static async deleteFinancial(req, res) {
    const {
      user: { userId },
      params: { id: financialId },
    } = req;
    const financial = await Financial.findOneAndRemove({
      _id: financialId,
      userId,
    });
    if (!financial) throw new NotFoundError(`No job with id: ${financialId}`);
    res.status(StatusCodes.OK).send();
  }
}

module.exports = Financials;
