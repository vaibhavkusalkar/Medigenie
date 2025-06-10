"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import {
	CardHeader,
	CardTitle,
	CardContent,
} from "@/components/custom/CustomCard";
import { Button } from "@/components/ui/button";
import CustomSpotlightCard from "@/components/custom/CustomSpotlightCard"; // <-- Custom Spotlight wrapper
import AudioGridContent from "@/components/dashboard/AudioGridContent";
import PatientGridContent from "@/components/dashboard/PatientGridContent";
import SummaryGridContent from "@/components/dashboard/SummaryGridContent";
import DiseaseGridContent from "@/components/dashboard/DiseaseGridContent";
import MedicationGrid from "@/components/dashboard/MedicationGrid";

const DoctorDashboard = () => {
	return (
		<div className="flex flex-col min-h-0 h-[calc(100vh-64px)] w-full p-4">
			{/* Layout: Two rows */}
			<div className="flex flex-col flex-grow gap-4 min-h-0 overflow-hidden">
				{/* Row 1 */}
				<div className="flex flex-1 gap-4 min-h-0">
					{/* Summary */}
					<div className="w-3/5 flex flex-col min-h-0">
						<CustomSpotlightCard className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-white">
									Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-auto">
								<SummaryGridContent />
							</CardContent>
						</CustomSpotlightCard>
					</div>

					{/* Patient Details */}
					<div className="w-2/5 flex flex-col min-h-0">
						<CustomSpotlightCard className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-white">
									Patient Details
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-auto">
								<PatientGridContent />
							</CardContent>
						</CustomSpotlightCard>
					</div>
				</div>

				{/* Row 2 */}
				<div className="flex flex-1 gap-4 min-h-0">
					{/* Audio */}
					<div className="w-1/3 flex flex-col min-h-0">
						<CustomSpotlightCard className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-white">
									Audio/Voice
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-auto flex items-center justify-center z-30">
								<AudioGridContent />
							</CardContent>
						</CustomSpotlightCard>
					</div>

					{/* Disease */}
					<div className="w-1/3 flex flex-col min-h-0">
						<CustomSpotlightCard className="flex flex-col flex-grow min-h-0">
							<CardHeader>
								<CardTitle className="text-xl text-white">
									Disease
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-grow overflow-hidden">
								<div className="h-full overflow-y-auto remove-scrollbar pr-2">
									<DiseaseGridContent />
								</div>
							</CardContent>
						</CustomSpotlightCard>
					</div>

					{/* Medication (Already a custom grid so we just wrap it) */}
					<div className="w-1/3 flex flex-col min-h-0">
						<MedicationGrid />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDashboard;
