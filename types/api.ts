// Organization object for /get-doctor-organization
export interface DoctorOrganization {
  organization_id: string;
  organization_name: string;
}

// Response type for /get-doctor-organization
export interface GetDoctorOrganizationResponse {
  code: string;
  message: string;
  organization: DoctorOrganization[];
}

// Patient object for /get-patient-data
export interface PatientData {
  chronic_diseases: string[]; 
  gender: string;
  name: string;
  phone_number: string;
  dob: string;
  email: string;
  user_id: string;
}

// Response type for /get-patient-data
export interface GetPatientDataResponse {
  code: string;
  message: string;
  patient: PatientData;
}

export interface TopDiseases {
    name: string;
    percentage: number;
}

export interface GetAnalyzeResponse {
    code: string;
    message: string;
    prescribed_medicine: string[];
    top_5_disease: TopDiseases[];
    transcript_summary: string;
}

export interface RegisterResponse {
  code: string;
  message: string;
  user_id: string;
}

export interface LoginResponse {
  code: string;
  message: string;
  token?: string;
  user_id: string;
  doctor_id: string;
}

export interface CreateConsultationResponse {
  code: string;
  message: string;
  record_id: string;
}