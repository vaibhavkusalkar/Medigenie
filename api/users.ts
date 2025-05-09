import axios from "axios";
import { User } from "@/types/user";

export const searchUsers = async (search: string): Promise<User[]> => {
  try {
    const response = await axios.post("/users", { search });
    return response.data; // Assuming the API returns an array of users
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};