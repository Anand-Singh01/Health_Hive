import { IPatient, IPatientDto, IProfile } from "../../util/interfaces";

export const toPatientDto = (patient: IPatient) => {
  const profile = patient.profile as IProfile;
  return {
    patientId: patient._id + "",
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    dob: patient.dob,
    profile: {
      profileId: patient.profile._id + "",
      profileName: profile.profileName,
      profilePicture: profile.profilePicture || null,
    },
  } as IPatientDto;
};
