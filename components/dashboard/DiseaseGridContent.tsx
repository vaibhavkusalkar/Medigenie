'use client';
import { TopDiseases } from "@/types/api";
import React, { useEffect } from "react";

const diseases = [
	{ name: 'Type 2 Diabetes', percentage: 92 },
	{ name: 'Hypertension', percentage: 69 },
	{ name: 'Hyperlipidemia', percentage: 20 }
];

// Determine risk level based on percentage
const getCategory = (percentage: number) => {
	if (percentage < 30) return { label: 'Low Chance', color: 'text-green-600' };
	if (percentage < 70) return { label: 'Medium Chance', color: 'text-yellow-600' };
	return { label: 'High Chance', color: 'text-red-600' };
};

const DiseaseGridContent = () => {
	const [diseases, setDiseases] = React.useState<TopDiseases[]>([]);
	//const top5Diseases = sessionStorage.getItem("top5Diseases");
	useEffect(() => {
	const stored = sessionStorage.getItem("top5Diseases");
    if (stored) {
        try {
            const parsed: TopDiseases[] = JSON.parse(stored);
            setDiseases(parsed);
        } catch {
            setDiseases([]);
        }
    }
	}, [sessionStorage.getItem("top5Diseases")]);

	return (
		<div className="space-y-3 pt-3">
			{diseases.map((disease, index) => {
				const category = getCategory(disease.percentage);
				return (
					<div
						key={index}
						className="flex justify-between items-center"
					>
						<span className="text-white font-medium">{index+1}. {disease.name}</span>
						{/* <span className={`text-sm font-semibold ${category.color}`}>
							{category.label}
						</span> */}
					</div>
				);
			})}
		</div>
	);
};

export default DiseaseGridContent;
