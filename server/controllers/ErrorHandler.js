import models from '../models';

/**
 * Handle errors for all endpoints
 * @function errorHandler
 * @return {function} Express error-handling middleware which
 * handles all errors from the endpoints
 */
export default function errorHandler() {
  // error handlers must always take four arguments
  // eslint-disable-next-line
  return (err, req, res, next) => {
    console.log(err);
    const sequelize = models.sequelize;
    if (!err.code || err.code > 499) {
      if (err instanceof sequelize.ValidationError) {
        err.code = 400;
      } else {
        err.code = 500;
        err.message = 'Exception 500! Operation failed.';
      }
    }
    return res.status(err.code).json({
      error: err.message
    });
  };
}
