// Organization object for /get-doctor-organization
export interface DoctorOrganization {
  id: string;
  name: string;
}

// Response type for /get-doctor-organization
export interface GetDoctorOrganizationResponse {
  code: string;
  message: string;
  organization: DoctorOrganization[];
}

// Patient object for /get-patient-data
export interface PatientData {
  chronic_diseases: string; 
  gender: string;
  name: string;
  phone_number: string;
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
    top_5_diseases: TopDiseases[];
    transcript_summary: string;
}

