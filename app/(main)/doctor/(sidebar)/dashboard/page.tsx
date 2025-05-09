"use client";
import React, { use } from "react";
import { useEffect, useRef, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/custom/CustomCard";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import AudioGridContent from "@/components/dashboard/AudioGridContent";
import PatientGridContent from "@/components/dashboard/PatientGridContent";
import SummaryGridContent from "@/components/dashboard/SummaryGridContent";
import DiseaseGridContent from "@/components/dashboard/DiseaseGridContent";
import MedicationGrid from "@/components/dashboard/MedicationGrid";

const DoctorDashboard = () => {
	const diseases = [
		{ name: "Diabetes", percentage: 20 },
		{ name: "Hypertension", percentage: 55 },
		{ name: "Heart Disease", percentage: 85 },
		{ name: "Asthma", percentage: 40 },
		{ name: "Cancer", percentage: 95 },
		{ name: "Heart Disease", percentage: 85 },
		{ name: "Asthma", percentage: 40 },
		{ name: "Cancer", percentage: 95 },
	];

	// Function to determine the category based on percentage
	const getCategory = (percentage: number) => {
		if (percentage < 30) return "Low Chances";
		if (percentage < 70) return "Medium Chances";
		return "High Chances";
	};

	return (
		<div className="flex flex-col min-h-0 h-[calc(100vh-64px)] w-full p-4">
			{/* Split into 2 rows using flex and flex-grow */}
			<div className="flex flex-col flex-grow gap-4 min-h-0 overflow-hidden">
				{/* Row 1: 60% Summary and 40% Patient Details */}
				<div className="flex flex-1 gap-4 min-h-0">
					<div className="w-3/5 flex flex-col min-h-0">
						<Card className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-gray-800">
									Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-auto">
								<SummaryGridContent />
							</CardContent>
						</Card>
					</div>
					<div className="w-2/5 flex flex-col min-h-0">
						<Card className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-gray-800">
									Patient Details
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-auto">
								<PatientGridContent />
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Row 2: 30% Audio, 30% Disease, 40% Medication */}
				<div className="flex flex-1 gap-4 min-h-0">
					<div className="w-1/3 flex flex-col min-h-0">
						<Card className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-gray-800">
									Audio/Voice
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-auto flex items-center justify-center">
								<AudioGridContent />
							</CardContent>
						</Card>
					</div>
					<div className="w-1/3 flex flex-col min-h-0">
						<Card className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-gray-800">
									Disease
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-hidden">
								<div className="h-full overflow-y-auto remove-scrollbar pr-2">
									<DiseaseGridContent />
								</div>
							</CardContent>
						</Card>
					</div>
					<div className="w-1/3 flex flex-col min-h-0">
						<MedicationGrid />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDashboard;
