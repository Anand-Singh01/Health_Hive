import { Types } from "mongoose";
import { Profile } from "../models/profileModel";

export const createDefaultProfileQuery = async (patientId: Types.ObjectId) => {
  const profile = new Profile({
    documents: [],
    patient: patientId,
  });
  return await profile.save();
};