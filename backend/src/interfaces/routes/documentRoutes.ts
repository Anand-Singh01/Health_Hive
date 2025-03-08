import express, { Request, Response } from "express";
import {
    registerPatient
} from "../../infrastructure/repositories/patientRepository";
import { serverError } from "../../util/helper";
import { IRegisterPatient } from "../../util/interfaces";

const documentRoutes = express.Router();

documentRoutes.post("/get-all-documents", async (req: Request, res: Response) => {
  try {
    const response = await registerPatient(req.body as IRegisterPatient, res);
    res
      .status(response.statusCode)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    serverError(res, error);
  }
});

export = documentRoutes;