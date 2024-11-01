import express from "express";
import swaggerUi from "swagger-ui-express";
import { setupSwagger } from "./swagger";
import courseRoute from "./routes/course.route";
import { errorHandler } from "./middlewares/errorHandler";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10);

app.use(cors());
app.use(express.json());

app.use("/api/courses", courseRoute);
app.use(errorHandler);
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
