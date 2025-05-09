export interface CreateUserRequest {
  email: string
  password: string
  name: string
  phone_number: string
  aadhaar_number: string
  dob: string // Date in "YYYY-MM-DD" format
  gender: string
  chronic_diseases: string[]
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CreateUserResponse {
  code: string 
  message: string
  user_id: string
}