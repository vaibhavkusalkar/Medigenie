"use client";

import React, { useState } from "react";
import axios from "axios";
import { CreateConsultationResponse, GetPatientDataResponse } from "@/types/api";
import { headers } from "next/headers";
import { CardHeader, CardTitle, CardContent } from "@/components/custom/CustomCard";
import CustomSpotlightCard from "@/components/custom/CustomSpotlightCard";
import AudioGridContent from "@/components/dashboard/AudioGridContent";
import { useRouter } from "next/navigation"

const DoctorHome = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [patient, setPatient] = useState<GetPatientDataResponse["patient"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to make a GET request with query params
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    if (!searchInput.trim()) return;

    setIsLoading(true);
    setError("");
    setPatient(null);
    console.log("Searching for patient:", searchInput);
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || ""}/get-patient-data`;

      // Making the GET request with query params
      const response = await axios.post<GetPatientDataResponse>(apiUrl, {
        user_email: searchInput, // Correctly pass the data here
      });

      if (response.data.patient) {
        console.log("Patient found:", response.data.patient);
        setPatient(response.data.patient);
      } else {
        setError("No patient found.");
      }
    } catch (err) {
      console.error("Failed to fetch patient:", err);
      setError("Error fetching patient data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Select Patient</h1>

      <form onSubmit={handleSearch} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Enter email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-4 py-2 border rounded text-black"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {patient && (
        <div className="mt-6 max-w-md mx-auto bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">{patient.name}</h2>
          <p>{patient.phone_number}</p>
          {/* Add more patient fields as needed */}
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            onClick={async () => {
              sessionStorage.setItem("patient", JSON.stringify(patient));
              sessionStorage.setItem("patientId", patient.user_id);
              
              const payload = {
                patient_id: patient.user_id,
                doctor_id:sessionStorage.getItem("doctorId"),
                organization_id:sessionStorage.getItem("orgId")
              };
              
              const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || ""}/create-consultation`;
              try {
                const result = await axios.post<CreateConsultationResponse>(apiUrl, payload);
                sessionStorage.setItem("consultationId", result.data.record_id);
              } catch (error) {
                console.error("Error creating consultation:", error);
              }
              router.replace("/doctor/dashboard");
              // You can also navigate or trigger other actions here
            }}
          >
            Select Patient
          </button>
        </div>
      )}

    </div>
  );
};

export default DoctorHome;








// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import {
// 	Command,
// 	CommandEmpty,
// 	CommandGroup,
// 	CommandInput,
// 	CommandItem,
// 	CommandList,
// } from "@/components/ui/command";

// const DoctorHome = () => {
// 	const [searchInput, setSearchInput] = useState(""); // State to store the search input
// 	const [searchResults, setSearchResults] = useState([]); // State to store the API results
// 	const [isLoading, setIsLoading] = useState(false); // State to handle loading

// 	// Function to handle search
// 	const handleSearch = async (input: string) => {
// 		if (!input.trim()) {
// 			setSearchResults([]); // Clear results if input is empty
// 			return;
// 		}

// 		setIsLoading(true);
// 		try {
// 			const response = await axios.post("/users", { search: input }); // Call the API
// 			setSearchResults(response.data); // Update the results
// 		} catch (error) {
// 			console.error("Error fetching search results:", error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="min-h-screen p-6 bg-background">
// 			<h1 className="text-3xl font-bold text-white text-center mb-6">
// 				Select Patient
// 			</h1>
// 			<div className="max-w-md mx-auto">
// 				<Command className="rounded-lg border shadow-md">
// 					<CommandInput
// 						placeholder="Search by name, email, or phone..."
// 						value={searchInput}
// 						onValueChange={(value) => {
// 							setSearchInput(value); // Update the searchInput state
// 							handleSearch(value); // Trigger the search function
// 						}}
// 					/>
// 					{/* Conditionally Render CommandList */}
// 					{searchInput.trim() && (
// 						<CommandList
//                         className={`transition-all duration-300 ease-in-out transform ${
//                           searchInput.trim() ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
//                         }`}
//                       >
// 							{/* Empty State */}
// 							<CommandEmpty>
// 								{isLoading
// 									? "Searching..."
// 									: "No results found."}
// 							</CommandEmpty>

// 							{/* Search Results */}
// 							{searchResults.length > 0 && (
// 								<CommandGroup heading="Search Results">
// 									{searchResults.map((user) => (
// 										<CommandItem
// 											key={user.user_id}
// 											onSelect={() => {
// 												console.log(
// 													"Selected User:",
// 													user
// 												);
// 												setSearchInput(user.user_name); // Set the input to the selected user's name
// 											}}
// 										>
// 											<div>
// 												<p className="font-medium">
// 													{user.user_name}
// 												</p>
// 												<p className="text-sm text-gray-500">
// 													{user.user_email}
// 												</p>
// 												<p className="text-sm text-gray-500">
// 													{user.user_phone}
// 												</p>
// 											</div>
// 										</CommandItem>
// 									))}
// 								</CommandGroup>
// 							)}
// 						</CommandList>
// 					)}
// 				</Command>
// 			</div>
// 		</div>
// 	);
// };

// export default DoctorHome;
