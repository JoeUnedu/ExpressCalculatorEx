const {
  buildResponse,
  calcMode,
  calcMedian,
  calcMean,
  checkNumbers,
} = require("./helper");

const express = require("express");
const ExpressError = require("./expressError");

const app = express();

const PORT = 5000;

app.use(express.json());

function handleCalculation(inData, operation, fx) {
  if (inData) {
    const results = checkNumbers(inData);
    if (results["numbersAreValid"]) {
      const response = buildResponse(
        operation,
        fx(results["validatedNumbers"])
      );
      return response;
    } else {
      throw new ExpressError(results["message"], 400);
    }
  } else {
    throw new ExpressError(
      `'nums', that is, ${operation}?nums=comma_separated_list_of_numbers_list, is required.`,
      400
    );
  }
}

app.get("/:operation", function (req, res, next) {
  const calculation = {
    mean: calcMean,
    median: calcMedian,
    mode: calcMode,
  };

  const inOperation = req.params.operation;

  if (calculation[inOperation]) {
    try {
      const inNumbers = req.query.nums;
      const response = handleCalculation(
        inNumbers,
        inOperation,
        calculation[inOperation]
      );
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  } else {
    throw new ExpressError(
      `Route not found. Valid routes are ${Object.keys(calculation)}.`,
      404
    );
  }
});

// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});

// app.listen
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}.`);
});
