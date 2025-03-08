import mongoose, { Schema } from "mongoose";
import { IDoctor } from "../../util/interfaces";

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    profilePicture: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    clinic: { type: Schema.Types.ObjectId, ref: "Clinic", required: true },
    specialization: { type: String, required: true },
    availableSlots: [{ type: Schema.Types.ObjectId, ref: "AppointmentSlot" }],
  },
  { timestamps: true }
);

const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);

export default Doctor;