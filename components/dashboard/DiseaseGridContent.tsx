import React from "react";

const diseases = [
	{ name: 'Diabetes', percentage: 20 },
	{ name: 'Hypertension', percentage: 55 },
	{ name: 'Heart Disease', percentage: 85 },
	{ name: 'Asthma', percentage: 40 },
	{ name: 'Cancer', percentage: 95 },
	{ name: 'Heart Disease', percentage: 85 },
	{ name: 'Asthma', percentage: 40 },
	{ name: 'Cancer', percentage: 95 },
  { name: 'Diabetes', percentage: 20 },
	{ name: 'Hypertension', percentage: 55 },
	{ name: 'Heart Disease', percentage: 85 },
	{ name: 'Asthma', percentage: 40 },

];

// Determine risk level based on percentage
const getCategory = (percentage: number) => {
	if (percentage < 30) return { label: 'Low Chance', color: 'text-green-600' };
	if (percentage < 70) return { label: 'Medium Chance', color: 'text-yellow-600' };
	return { label: 'High Chance', color: 'text-red-600' };
};

const DiseaseGridContent = () => {
	return (
		<div className="space-y-3 pt-3">
			{diseases.map((disease, index) => {
				const category = getCategory(disease.percentage);
				return (
					<div
						key={index}
						className="flex justify-between items-center border-b pb-2"
					>
						<span className="text-gray-800 font-medium">{disease.name}</span>
						<span className={`text-sm font-semibold ${category.color}`}>
							{category.label}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default DiseaseGridContent;
