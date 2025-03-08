import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { toPatientDto } from "../../domain/dto/patientDto";
import { Patient } from "../../domain/models/patientModel";
import dependencies from "../../infrastructure/dependencies";
import {
  loginPatient,
  logoutUser,
  registerPatient,
} from "../../infrastructure/repositories/patientRepository";
import { serverError } from "../../util/helper";
import {
  ILoginPatient,
  IPatient,
  IRegisterPatient,
} from "../../util/interfaces";
import { verifyToken } from "../../util/token";

const patientAuthRoutes = express.Router();

patientAuthRoutes.post(
  "/register-patient",
  async (req: Request, res: Response) => {
    try {
      const response = await registerPatient(req.body as IRegisterPatient, res);
      res
        .status(response.statusCode)
        .json({ message: response.message, data: response.data });
    } catch (error) {
      serverError(res, error);
    }
  }
);

patientAuthRoutes.post(
  "/login-patient",
  async (req: Request, res: Response) => {
    try {
      const response = await loginPatient(req.body as ILoginPatient, res);
      res
        .status(response.statusCode)
        .json({ message: response.message, data: response.data });
    } catch (error) {
      serverError(res, error);
    }
  }
);

patientAuthRoutes.get(
  "/verify",
  verifyToken,
  async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtData;
    const patient = await Patient.findById(userId).populate("profile");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found", data: null });
    }
    const data = toPatientDto(patient as IPatient);
    res.status(200).json({ message: "success", data });
  }
);

patientAuthRoutes.get(
  "/logout-patient",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await logoutUser(res);
    res
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  }
);

patientAuthRoutes.get(
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

export = patientAuthRoutes;