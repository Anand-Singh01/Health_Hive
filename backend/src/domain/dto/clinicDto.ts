import { IClinic, IClinicDto } from "../../util/interfaces";

export const toClinicDto = (clinic: IClinic) => {
  return {
    clinicId: clinic._id.toString(),
    name: clinic.name,
    address: clinic.address,
    phone: clinic.phone,
    email: clinic.email,
    clinicType: clinic.clinicType,
    description: clinic.description,
    services: clinic.services,
    operatingHours: clinic.operatingHours,
  } as IClinicDto;
};
