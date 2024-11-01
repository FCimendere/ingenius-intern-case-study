import { createLogger, format, transports } from "winston";

// Create a logger
const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

export default logger;
