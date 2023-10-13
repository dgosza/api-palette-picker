import { Router } from 'express';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';

import AppError from '../../../lib/error';
import MessageRoutes from './palette.routes';
import logger from '../../../lib/logger';

const router = Router();

router.use(MessageRoutes);
router.use(errors());
router.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    logger.error({
      code: error.code,
      message: error.message,
      service: error.service,
      correlator: error.correlator,
      user_id: error.user_id,
    });
    return response.status(error.statusCode).json({
      code: error.code,
      message: error.message,
      correlator: error.correlator,
      user_id: error.user_id,
    });
  }
  logger.error(error);
  return response.status(500).json({
    errorCde: 'UNHANDLED_ERROR',
    message: error,
  });
});

export default router;
