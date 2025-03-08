import mongoose, { Schema } from "mongoose";
import { IClinic } from "../../util/interfaces";

export enum ClinicType {
  GENERAL = "general",
  SPECIALIZED = "specialized",
}

const clinicSchema = new Schema<IClinic>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
    clinicType: {
      type: String,
      enum: ClinicType,
      default: ClinicType.GENERAL,
    },
    services: {
      type: [String],
      required: true,
    },
    operatingHours: {
      type: Map,
      of: {
        openTime: { type: String },
        closeTime: { type: String },
      },
    },
    doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
  },
  { timestamps: true }
);

const Clinic = mongoose.model<IClinic>("Clinic", clinicSchema);

export default Clinic;