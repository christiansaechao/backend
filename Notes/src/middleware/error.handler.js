export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong on the server.";

  res.status(statusCode).send({
    success: false,
    error: message,
  });
};
