import mongoose, { Schema } from "mongoose";
import { IAppointment } from "../../util/interfaces";

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  WAITLISTED = "waitlisted",
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointmentSlot: {
      type: Schema.Types.ObjectId,
      ref: "AppointmentSlot",
      required: true,
    },
    status: {
      type: String,
      enum: AppointmentStatus,
      default: AppointmentStatus.SCHEDULED,
    },
    symptoms: String,
    diagnosis: String,
    followUp: Date,
  },
  { timestamps: true }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;