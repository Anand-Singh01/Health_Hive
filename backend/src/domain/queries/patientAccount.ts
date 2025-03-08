import bcrypt from "bcrypt";
import { IRegisterPatient } from "../../util/interfaces";
import { Patient } from "../models/patientModel";
export const findPatientByEmail = async (email: string) => {
  return await Patient.findOne({ email });
};

export const createUser = async (data: IRegisterPatient) => {
  const { dob, email, firstName, lastName, password, userName } = data;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new Patient({
    dob,
    email,
    firstName,
    lastName,
    password: hashedPassword,
    userName,
  });
  return await newUser.save();
};
