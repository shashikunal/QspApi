/*@Desc GET ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/bootcamp'
*/
import { asyncHandler } from "../middlewares/async";
import { BootCampModel } from "../Models/BootCamp";
import { ErrorResponse } from "./../uitils/ErrorResponse";

export let GetBootCamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);
  let reqQuery = { ...req.query };
  let removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach(param => delete reqQuery[param]);

  queryStr = queryStr.replace(/\b(gtr|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = BootCampModel.find(JSON.parse(queryStr));
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCampModel.countDocuments();
  query.skip(startIndex).limit(limit);

  let bootcamps = await query;
  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
});

/*@Desc POST ROUTES
  @ACCESS PUBLIC
  @ROUTE '/api/v1/bootcamp/id'
*/

export let getBootCamp = asyncHandler(async (req, res, next) => {
  let bootCamp = await BootCampModel.findById(req.params.id);
  if (!bootCamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  res.status(200).json({ success: true, data: bootCamp });
});

/*@Desc POST ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp'
*/
export let CreateBootCamps = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCampModel.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "created new Bootcamp", data: bootcamp });
});

/*@Desc PUT ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp/id'
*/

export let updateBootCamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCampModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  res.status(200).json({ success: true, data: bootcamp });
});

/*@Desc DELETE ROUTES
  @ACCESS PRIVATE
  @ROUTE '/api/v1/bootcamp/id'
*/

export let deleteBootCamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCampModel.findByIdAndDelete(req.params.id, {
    runValidators: true,
  });
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  res.status(200).json({ success: true, data: {} });
});
