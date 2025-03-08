import { Response } from "express";
import { toClinicDto } from "../../domain/dto/clinicDto";
import {
    createClinic,
    findClinicByEmail,
} from "../../domain/queries/clinicAccount";
import {
    IClinic,
    IRegisterClinic,
    ServiceResponse,
} from "../../util/interfaces";
import { setTokenAndCookie } from "../../util/token";

export const registerClinic = async (
  data: IRegisterClinic,
  res: Response
): Promise<ServiceResponse> => {
  let response: ServiceResponse = {
    message: "User created",
    status: true,
    statusCode: 200,
    data: null,
  };

  try {
    const existingClinic = await findClinicByEmail(data.email);

    if (existingClinic) {
      response.statusCode = 401;
      throw new Error("Clinic already exists");
    }

    const savedClinic = await createClinic(data);

    if (!savedClinic) {
      throw new Error("Error creating clinic");
    }

    setTokenAndCookie(
      res,
      {
        email: savedClinic.email,
        userId: savedClinic._id.toString(),
        userType: "clinic",
      },
      "7d"
    );
    response.data = toClinicDto(savedClinic as IClinic);
  } catch (error) {
    response.status = false;
    response.message = (error as Error).message;
    if (!response.statusCode || response.statusCode === 200) {
      response.statusCode = 500;
    }
  }
  return response;
};