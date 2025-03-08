import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dependencies from "../../infrastructure/dependencies";
import { registerClinic } from "../../infrastructure/repositories/clinicRepository";
import {
    loginPatient,
    logoutUser,
} from "../../infrastructure/repositories/patientRepository";
import { serverError } from "../../util/helper";
import { ILoginPatient, IRegisterClinic } from "../../util/interfaces";
import { verifyToken } from "../../util/token";

const clinicAuthRoutes = express.Router();

clinicAuthRoutes.post(
  "/register-clinic",
  async (req: Request, res: Response) => {
    try {
      const response = await registerClinic(req.body as IRegisterClinic, res);
      res
        .status(response.statusCode)
        .json({ message: response.message, data: response.data });
    } catch (error) {
      serverError(res, error);
    }
  }
);

clinicAuthRoutes.post("/login-clinic", async (req: Request, res: Response) => {
  try {
    // const appointment = new Appointment();
    // const appSlot = new AppointmentSlot();
    // const clinic = new Clinic();
    // const doctor = new Doctor();
    // const document = new Document();
    const response = await loginPatient(req.body as ILoginPatient, res);
    res
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    serverError(res, error);
  }
});

clinicAuthRoutes.get(
  "/verify",
  verifyToken,
  async (req: Request, res: Response) => {
    res.json({ message: "Authenticated user", user: res.locals.jwtData });
  }
);

clinicAuthRoutes.get(
  "/logout-patient",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await logoutUser(res);
    res
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  }
);

clinicAuthRoutes.get(
  "/get-ws-token",
  verifyToken,
  (req: Request, res: Response) => {
    const token = req.signedCookies[dependencies.config.cookie.cookieName!];
    const decoded: any = jwt.verify(
      token,
      dependencies.config.cookie.jwtSecret!
    );
    const wsToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      dependencies.config.cookie.jwtSecret!,
      {
        expiresIn: decoded.exp - Math.floor(Date.now() / 1000),
      }
    );
    res.status(200).json({ wsToken });
  }
);

export = clinicAuthRoutes;