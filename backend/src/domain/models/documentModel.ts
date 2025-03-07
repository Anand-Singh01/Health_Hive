import { model, Schema } from "mongoose";
import { IDocument } from "../../util/interfaces";

export enum DocumentType {
  MEDICAL_RECORD = "medical_record",
  PRESCRIPTION = "prescription",
  LAB_REPORT = "lab_report",
  IMAGING = "imaging", // X-rays, MRIs, etc.
  INSURANCE = "insurance", // Insurance documents
  ID_PROOF = "id_proof", // Identification documents (e.g., driver's license)
  MEDICATION_LIST = "medication_list", // List of prescribed medications
  VACCINATION_RECORD = "vaccination_record", // Records of vaccines administered
  DISCHARGE_SUMMARY = "discharge_summary", // Hospital discharge summary
  OTHER = "other", // Any other type of document
}

const documentSchema = new Schema<IDocument>({
  documents: [
    {
      documentName: { type: String, required: true },
      documentType: {
        type: String,
        enum: DocumentType,
        required: true,
        default: DocumentType.OTHER,
      },
      documentDescription: { type: String, required: false },
      documentFile: { type: String, required: true },
    },
  ],
  appointmentId: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  clinicId: { type: Schema.Types.ObjectId, ref: "Clinic", required: true },
  sentBy: {
    type: String,
    required: true,
    enum: ["patient", "clinic"],
  },

  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Document = model<IDocument>("Document", documentSchema);