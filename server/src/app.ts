import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import routes from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

const app = express();

// Vercel sits behind a proxy; this lets rate limiting see the real client IP.
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());

app.use("/api", routes);
app.use("/api", notFound);
app.use(errorHandler);

export default app;