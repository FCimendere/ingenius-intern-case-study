import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger"; // Adjust the import path as needed

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export default loggerMiddleware;
