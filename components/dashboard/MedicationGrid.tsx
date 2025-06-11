"use client";
import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/custom/CustomCard";
import { Search, X } from "lucide-react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import CustomSpotlightCard from "../custom/CustomSpotlightCard";


const MedicationGrid = () => {
	const [error, setError] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [isInputVisible, setIsInputVisible] = useState(false);
	const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);
	const [medicines, setMedicines] = React.useState<string[]>([]);
	
	useEffect(() => {
	  const stored = sessionStorage.getItem("prescribedMedicine");
	  if (stored) {
		try {
		  const parsed: string[] = JSON.parse(stored);
		  setMedicines(parsed);
		  setSelectedMedicines(parsed); // <-- Select all by default
		} catch {
		  setMedicines([]);
		  setSelectedMedicines([]);
		}
	  } else {
		setMedicines([]);
		setSelectedMedicines([]);
	  }
	}, []);

	// Static medicine list
	// const medicines = [
	// 	"Paracetamol",
	// 	"Ibuprofen",
	// 	"Aspirin",
	// 	"Amoxicillin",
	// 	"Metformin",
	// 	"Atorvastatin",
	// 	"Omeprazole",
	// 	"Losartan",
	// ];

	const filteredMedicines = medicines.filter((med) =>
		med.toLowerCase().includes(searchInput.toLowerCase())
	);

	const toggleMedicine = (name: string) => {
		setSelectedMedicines((prev) =>
			prev.includes(name)
				? prev.filter((m) => m !== name)
				: [...prev, name]
		);
	};

	const handleToggleInput = () => {
		setSearchInput("");
		setIsInputVisible((prev) => !prev);
	};

	useEffect(() => {
		if (selectedMedicines.length === 0) {
			setError("No medicines selected.");
		} else {
			setError(""); // clear error if selection exists
		}
	}, [selectedMedicines]);

	return (

		<CustomSpotlightCard className="flex flex-col flex-grow min-h-0 bg-transparent border-0">
			<CardHeader className="flex flex-row items-center h-14 justify-between">
				<CardTitle className="text-xl text-white">
					Medication
				</CardTitle>

				{/* Toggle Search Input */}
				<div className="relative">
					{isInputVisible ? (
						<div className="flex items-center transition-all duration-300 ease-in-out w-full">
							<input
								type="text"
								placeholder="Search medicines"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								className="px-3 py-1 border border-gray-500 rounded-full w-40 text-sm transition-all duration-700 bg-transparent"
								autoFocus
							/>
							<button
								onClick={handleToggleInput}
								className="ml-2 p-1 hover:bg-gray-600 rounded-full transition"
							>
								<X className="w-6 h-6 text-white" />
							</button>
						</div>
					) : (
						<button
							onClick={handleToggleInput}
							className="p-2 hover:bg-gray-600 rounded-full transition-all"
						>
							<Search className="w-5 h-5 text-white" />
						</button>
					)}
				</div>
			</CardHeader>

			<CardContent className="flex-grow overflow-auto">
				{isInputVisible ? (
					<div className="max-w-md mx-auto mb-4">
						<Command className="rounded-lg bg-transparent">
							<CommandList>
								{filteredMedicines.length > 0 ? (
									<CommandGroup>
										{filteredMedicines.map((med) => (
											<CommandItem
												key={med}
												className="flex justify-between items-center py-1 text-md text-white"
											>
												<label className="flex items-center gap-2 cursor-pointer">
													<input
														type="checkbox"
														checked={selectedMedicines.includes(
															med
														)}
														onChange={() =>
															toggleMedicine(med)
														}
													/>
													<span>{med}</span>
												</label>
											</CommandItem>
										))}
									</CommandGroup>
								) : (
									<CommandEmpty>
										No results found.
									</CommandEmpty>
								)}
							</CommandList>
						</Command>
					</div>
				) : error === "" ? (
					<div className="max-w-md mx-auto px-3 mt-1">
						{selectedMedicines.length > 0 && (
							<>
								{selectedMedicines.map((med) => (
									<div
										key={med}
										className="flex justify-between items-center py-1 text-md text-white"
									>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												checked
												onChange={() =>
													toggleMedicine(med)
												} // allow unchecking
											/>
											<span>{med}</span>
										</label>
									</div>
								))}
							</>
						)}
					</div>
				) : (
					<p className="text-md text-white text-center flex items-center justify-center h-full">
						{error}
					</p>
				)}
			</CardContent>
		</CustomSpotlightCard>
	);
};

export default MedicationGrid;
