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
    const { search, sort, category, type, page } = req.query;

    const queryObj = {
      userId,
    };

    // search
    if (search) {
      queryObj.name = {
        $regex: search,
        $options: "i",
      };
    }

    // category
    if (category && category !== "all") {
      queryObj.category = category;
    }
    if (type && type !== "all") {
      queryObj.type = type;
    }
    let result = Financial.find(queryObj);

    // sort
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("name");
    }
    if (sort === "z-a") {
      result = result.sort("-name");
    }

    // pagination
    const pageNumber = page || 1;
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;

    result = result.limit(pageSize).skip(skip);
    const financials = await result;
    const financialsCount = await Financial.countDocuments(queryObj);
    const numberOfPages = Math.ceil(financialsCount / pageSize);
    res
      .status(StatusCodes.OK)
      .json({ financials, financialsCount, numberOfPages });
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
