export interface Organization {
  id: string
  name: string
}

export interface GetDoctorOrganizationsRequest {
  user_id: string
}

export interface GetDoctorOrganizationsResponse {
  code: string 
  message: string
  organizations: Organization[]
}