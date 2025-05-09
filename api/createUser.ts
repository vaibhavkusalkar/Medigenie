import axios from "axios"
import { CreateUserRequest, CreateUserResponse } from "@/types/user"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL

export const createUser = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
  try {
    const response = await axios.post<CreateUserResponse>(`${BASE_URL}/create`, data)
    return response.data
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}