import { Types } from "mongoose";
import { AppointmentStatus } from "../domain/models/appointmentModel";
import { AppointmentSlotStatus } from "../domain/models/appointmentSlotModel";
import { ClinicType } from "../domain/models/clinicModel";

// Schema Interfaces
export interface IPatient extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile: Types.ObjectId | IProfile;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile extends Document {
  _id: Types.ObjectId;
  profileName: string;
  documents: string[] | IDocument[];
  profilePicture: string | null;
  patient: Types.ObjectId | IPatient;
}

export interface IDocument extends Document {
  _id: Types.ObjectId;
  documents: {
    documentName: string;
    documentType: DocumentType;
    documentDescription: string | null;
    documentFile: string;
  }[];
  appointmentId: Types.ObjectId | IAppointment;
  clinicId: Types.ObjectId | IClinic;
  profile: Types.ObjectId | IProfile;
  sentBy: "patient" | "clinic";
  createdAt: Date;
  updatedAt: Date;
}

export interface IClinic extends Document {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  clinicType: ClinicType;
  description?: string;
  services: string[];
  operatingHours: {
    [day: string]: {
      openTime: string;
      closeTime: string;
    };
  };
  doctors: Types.ObjectId[] | IDoctor[];
}

export interface IAppointmentSlot extends Document {
  _id: string;
  doctorId: string | IDoctor;
  clinicId: string | IClinic;
  dateTime: Date;
  status: AppointmentSlotStatus;
}

export interface IDoctor extends Document {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  clinic: Types.ObjectId | IClinic;
  availableSlots: IAppointmentSlot[];
  profilePicture?: string;
}

export interface IAppointment extends Document {
  patient: Types.ObjectId | IPatient;
  doctor: Types.ObjectId | IDoctor;
  mentalHealthProfessional?: Types.ObjectId;
  date: Date;
  status: AppointmentStatus;
  symptoms?: string;
  diagnosis?: string;
  followUp?: Date;
}