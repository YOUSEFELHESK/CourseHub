class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Preserve proper stack trace for where our error was thrown (only in V8)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
