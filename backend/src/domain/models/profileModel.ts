import { model, Schema } from "mongoose";
import { IProfile } from "../../util/interfaces";

const profileSchema = new Schema<IProfile>({
  profileName: { type: String, required: true, default: "Profile Name" },
  profilePicture: {
    type: String,
    required: false,
  },
  documents: [
    {
      type: Schema.Types.ObjectId,
      required: false,
    },
  ],
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
});

export const Profile = model<IProfile>("Profile", profileSchema);