import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { connectToDatabase } from "../infrastructure/database/mongo/connection";
import dependencies from "../infrastructure/dependencies";
import clinicAuthRoutes from "../interfaces/routes/clinicAuthRoutes";
import patientAuthRoutes from "../interfaces/routes/patientAuthRoutes";
import { verifyToken } from "../util/token";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(dependencies.config.cookie.cookieSecret));

app.use(
  cors({
    origin: [dependencies.config.client.url!],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  })
);

app.use("/api/auth/patient", patientAuthRoutes);
app.use("/api/auth/clinic", clinicAuthRoutes);
app.use(verifyToken);

const httpServer = createServer(app);

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to database.");

    httpServer.listen(PORT, async () => {
      console.log(`Http server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();