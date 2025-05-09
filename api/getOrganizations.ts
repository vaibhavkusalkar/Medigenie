import axios from "axios"
import { GetDoctorOrganizationsRequest, GetDoctorOrganizationsResponse } from "@/types/organizations"

export const getDoctorOrganizations = async (
  userId: string
): Promise<GetDoctorOrganizationsResponse> => {
  try {
    const requestBody: GetDoctorOrganizationsRequest = {
      user_id: userId,
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL
    const response = await axios.post<GetDoctorOrganizationsResponse>(
      `${baseUrl}/get-doctor-organization`,
      requestBody
    )

    return response.data
  } catch (error) {
    console.error("Error fetching organizations:", error)
    throw error
  }
}