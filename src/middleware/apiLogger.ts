import { Log } from '../models/mongo/Log';
import { logger } from '../config/logger';
import { Request, Response, NextFunction } from 'express';

export const requestLogger = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Save Request Body
  const requestBody = req.body;

  // Override res.json() to capture response directly
  const originalJson = res.json;

  res.json = async function (data: any) {
    const responseTime = Date.now() - start;

    console.log('Data', data);

    const log = new Log({
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      requestBody: requestBody,
      responseBody: data, // Store response directly here
      statusCode: res.statusCode,
      responseTime: responseTime
    });

    try {
      await log.save(); // Save log directly to MongoDB
      logger.info(`Logged ${req.method} ${req.originalUrl}`);
    } catch (error: any) {
      logger.error(`Log Save Failed: ${error.message}`);
    }

    return originalJson.call(this, data); // Continue with response
  };

  next();
};
