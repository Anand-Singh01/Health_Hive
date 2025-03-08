import bcrypt from "bcrypt";
import { IRegisterClinic } from "../../util/interfaces";
import Clinic from "../models/clinicModel";
export const findClinicByEmail = async (email: string) => {
  return await Clinic.findOne({ email });
};

export const createClinic = async (data: IRegisterClinic) => {
  const { address, email, name, password, phone } = data;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newClinic = new Clinic({
    address,
    email,
    doctors: [],
    name,
    password: hashedPassword,
    operatingHours: {},
    services: [], 
    phone
  });
  return await newClinic.save();
};
