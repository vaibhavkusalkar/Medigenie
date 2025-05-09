import { CreateUserRequest } from "@/types/user";
import { Mail, Phone } from "lucide-react";
import React from "react";

const PatientGridContent = () => {
	const UserData: CreateUserRequest = {
		email: "testuser@gmail.com",
		password: "password",
		name: "Test User",
		phone_number: "1234567890",
		aadhaar_number: "1234-5678-9012",
		dob: "2000-01-01", // Date in "YYYY-MM-DD" format
		gender: "male",
		chronic_diseases: ["Cancer", "Hypertension"],
	};

	return (
		<div className="flex flex-col items-center text-center gap-1.5 px-2">
			<div className="w-16 h-16 flex items-center justify-center rounded-full bg-muted">
				<img
					src={
						UserData.gender === "male"
							? "/assets/images/male.jpg"
							: "/assets/images/female.jpg"
					}
					alt="Profile"
					className="w-full h-full object-cover rounded-full"
				/>
			</div>

			<p className="font-semibold text-lg text-gray-900">
				{UserData.name}
			</p>

			<div className="w-1/2 border-t border-muted" />

			<p className="text-sm text-muted-foreground">
				Age:{" "}
				{new Date().getFullYear() -
					new Date(UserData.dob).getFullYear()}
			</p>

			<div className="w-1/2 border-t border-muted" />

			<div className="space-y-0.5">
				<p className="text-sm font-medium pb-0 text-gray-800">
					Chronic Diseases
				</p>
				<p className="text-sm text-muted-foreground">
					{/* Map through chronicDiseases and join them with commas */}
					{UserData.chronic_diseases.join(", ")}
				</p>
			</div>

			<div className="w-1/2 border-t border-muted" />

			<div className="flex items-center justify-center gap-3 pt-0.5 text-muted-foreground">
				<a href={`mailto:${UserData.email}`} title="Send Email">
					<Mail className="w-4 h-4 transition-all duration-100 hover:text-gray-800" />
				</a>
				<div className="h-4 border-l border-muted" />
				<a href={`tel:${UserData.phone_number}`} title="Call">
					<Phone className="w-4 h-4 transition-all duration-100 hover:text-gray-800" />
				</a>
			</div>
		</div>
	);
};

export default PatientGridContent;
