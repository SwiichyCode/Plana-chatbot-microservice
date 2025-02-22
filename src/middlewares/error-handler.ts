import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Une erreur interne est survenue',
  });
};
