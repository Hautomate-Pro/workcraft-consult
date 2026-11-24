import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import routes from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.use("/api", routes);
app.use("/api", notFound);
app.use(errorHandler);

export default app;