import mongoose, { Schema, Types } from "mongoose";
import { IAppointmentSlot } from "../../util/interfaces";

export enum AppointmentSlotStatus {
  OPEN = "open",
  SCHEDULED = "scheduled",
}

const appointmentSlotSchema = new Schema<IAppointmentSlot>({
  doctorId: {
    type: Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  clinicId: { type: Types.ObjectId, ref: "Clinic", required: true },
  dateTime: Date,
  status: {
    type: String,
    enum: AppointmentSlotStatus,
    default: AppointmentSlotStatus.OPEN,
  },
});

const AppointmentSlot = mongoose.model<IAppointmentSlot>(
  "AppointmentSlot",
  appointmentSlotSchema
);

export default AppointmentSlot;