'use client';
import { PatientData } from "@/types/api";
import { Mail, Phone } from "lucide-react";
import React, { useEffect } from "react";

const PatientGridContent = () => {
	var userData = {} as PatientData;	
	const storedUserData = sessionStorage.getItem("patientData");
	if (!storedUserData) {
	  console.error("No patientData found in sessionStorage.");
	  return;
	}
	const parsedUserData: PatientData = JSON.parse(storedUserData);
    userData = parsedUserData;
	console.log("Parsed User Data:", userData);

	// const [userData, setUserData] = React.useState<PatientData | null>(null);
	// const storedUserData = sessionStorage.getItem("patientData");
	
	// useEffect(() => {
	//   if (!storedUserData) {
	// 	console.error("No patientData found in sessionStorage.");
	// 	return;
	//   }
	//   try {
	// 	const parsedUserData: PatientData = JSON.parse(storedUserData);
	// 	setUserData(parsedUserData);
	// 	console.log("Saved data :", userData);
	// 	console.log("Parsed User Data:", parsedUserData);
	//   } catch (error) {
	// 	console.error("Error parsing user data:", error);
	//   }
	// }, [storedUserData]);
	
	//console.log("Stored User Data:", storedUserData);


	return (
		<div className="flex flex-col items-center text-center gap-1.5 px-2">
			<div className="w-16 h-16 flex items-center justify-center rounded-full bg-muted">
				<img
					src={
						userData.gender === "Male"
							? "/assets/images/male.jpg"
							: "/assets/images/female.jpg"
					}
					alt="Profile"
					className="w-full h-full object-cover rounded-full"
				/>
			</div>

			<p className="font-semibold text-lg text-white">
				{userData!.name}
			</p>

			<div className="border-gray-600 w-1/2 border-t border-muted" />

			<p className="text-white text-sm text-muted-foreground">
				Age:{" "}
				{new Date().getFullYear() -
					new Date(userData!.dob).getFullYear()}
			</p>

			<div className="border-gray-600 w-1/2 border-t border-muted" />

			<div className="space-y-0.5">
				<p className="text-sm font-medium pb-0 text-gray-400">
					Chronic Diseases
				</p>
				<p className="text-white text-sm text-muted-foreground">
				  {Array.isArray(userData.chronic_diseases)
					? userData.chronic_diseases.join(", ")
					: String(userData.chronic_diseases).replace(/[{}]/g, "").split(",").join(", ")}
				</p>
			</div>

			<div className="border-gray-600 w-1/2 border-t border-muted" />

			<div className="flex items-center justify-center gap-3 pt-0.5 text-muted-foreground">
				<a href={`mailto:${userData!.email}`} title="Send Email">
					<Mail className="w-4 h-4 transition-all duration-100 hover:text-gray-200" />
				</a>
				<div className="h-4 border-l border-muted" />
				<a href={`tel:${userData!.phone_number}`} title="Call">
					<Phone className="w-4 h-4 transition-all duration-100 hover:text-gray-200" />
				</a>
			</div>
		</div>
	);
};

export default PatientGridContent;
