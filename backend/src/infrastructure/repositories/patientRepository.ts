import bcrypt from "bcrypt";
import { Response } from "express";
import { toPatientDto } from "../../domain/dto/patientDto";
import {
  createPatient,
  findPatientByEmail,
} from "../../domain/queries/patientAccount";
import {
  ILoginPatient,
  IPatient,
  IProfile,
  IRegisterPatient,
  ServiceResponse,
} from "../../util/interfaces";
import { setTokenAndCookie } from "../../util/token";
import dependencies from "../dependencies";
import { createPatientDefaultProfile } from "./profileRepository";

export const registerPatient = async (
  data: IRegisterPatient,
  res: Response
): Promise<ServiceResponse> => {
  let response: ServiceResponse = {
    message: "User created",
    status: true,
    statusCode: 200,
    data: null,
  };

  try {
    const existingUser = await findPatientByEmail(data.email);

    if (existingUser) {
      response.statusCode = 401;
      throw new Error("User already exists");
    }

    const savedUser = await createPatient(data);

    if (!savedUser) {
      throw new Error("Error creating user");
    }
    const profileResponse = await createPatientDefaultProfile(savedUser._id);
    savedUser.profile = (profileResponse.data as IProfile)._id;
    await (await savedUser.save()).populate("profile");
    if (!profileResponse.status) {
      throw new Error("Error creating profile");
    }

    setTokenAndCookie(
      res,
      {
        email: savedUser.email,
        userId: savedUser._id.toString(),
        userType: "patient",
      },
      "7d"
    );
    response.data = toPatientDto(savedUser as IPatient);
  } catch (error) {
    response.status = false;
    response.message = (error as Error).message;
    if (!response.statusCode || response.statusCode === 200) {
      response.statusCode = 500;
    }
  }
  return response;
};

export const loginPatient = async (
  data: ILoginPatient,
  res: Response
): Promise<ServiceResponse> => {
  let response: ServiceResponse = {
    status: true,
    statusCode: 200,
    message: "Login successful",
    data: null,
  };

  try {
    const patient = await findPatientByEmail(data.email);

    if (!patient) {
      response.statusCode = 401;
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      data.password,
      patient.password
    );
    if (!isPasswordValid) {
      response.statusCode = 401;
      throw new Error("Invalid credentials");
    }
    await patient.populate("profile");
    // Generate token and set cookie
    setTokenAndCookie(
      res,
      {
        userId: patient._id.toString(),
        email: patient.email,
        userType: "patient",
      },
      "7d"
    );
    response.data = toPatientDto(patient as IPatient);
  } catch (error) {
    response.status = false;
    response.message = (error as Error).message;
    response.statusCode =
      response.statusCode === 200 ? 500 : response.statusCode;
  }
  return response;
};

export const logoutUser = async (res: Response): Promise<ServiceResponse> => {
  let response: ServiceResponse = {
    status: true,
    statusCode: 200,
    message: "User logged out",
    data: null,
  };

  try {
    res.clearCookie(dependencies.config.cookie.cookieName!, {
      httpOnly: true,
      secure: true,
    });
  } catch (error) {
    response.status = false;
    response.message = (error as Error).message;
    response.statusCode = 500;
  }
  return response;
};