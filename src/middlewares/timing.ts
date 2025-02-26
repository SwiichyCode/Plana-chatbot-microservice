import { Request, Response, NextFunction } from 'express';

export const timingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = performance.now();

  res.on('finish', () => {
    const end = performance.now();
    const duration = end - start;

    console.log({
      path: req.path,
      method: req.method,
      duration: `${duration.toFixed(2)}ms`,
      timestamp: new Date().toISOString(),
    });
  });

  next();
};
