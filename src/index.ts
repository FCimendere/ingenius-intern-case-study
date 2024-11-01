import express from "express";
import { setupSwagger } from "./swagger";
import courseRoute from "./routes/course.route";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
import cors from "cors";
import loggerMiddleware from "./middlewares/loggerMiddelware";
import logger from "./utils/logger";

dotenv.config();

const app = express();
app.use(loggerMiddleware);
const PORT: number = parseInt(process.env.PORT as string, 10);

app.use(cors());
app.use(express.json());

app.use("/api/courses", courseRoute);
app.use(errorHandler);

setupSwagger(app);

app.listen(PORT, () => {
  logger.info("Server is starting...");
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger docs are available at http://localhost:${PORT}/api-docs`
  );
});

export default app;
