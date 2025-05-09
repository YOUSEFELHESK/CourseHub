import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { ApiFeatures } from "../utils/apiFeatures.js";

export class FactoryController {
  constructor(model) {
    this.model = model;
  }

  getAll = catchAsync(async (req, res, next) => {
    let query = this.model.find();

    const apiFeatures = new ApiFeatures(query, req.query)
      .filter()
      .sort()
      .paginate();
    const data = await apiFeatures.query;

    res.status(200).json({
      status: "success",
      results: data.length,
      data: { data },
    });
  });

  getById = catchAsync(async (req, res, next) => {
    const item = await this.model.findById(req.params.id);

    if (!item) {
      return next(new AppError("No item found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { item },
    });
  });

  create = catchAsync(async (req, res, next) => {
    const newItem = await this.model.create(req.body);
    res.status(201).json({
      status: "success",
      data: { item: newItem },
    });
  });

  update = catchAsync(async (req, res, next) => {
    const updatedItem = await this.model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      return next(new AppError("No item found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { item: updatedItem },
    });
  });

  delete = catchAsync(async (req, res, next) => {
    const deletedItem = await this.model.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return next(new AppError("No item found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}
