'use client';
import React, { useEffect } from "react";

const SummaryGridContent = () => {
	const [summary, setSummary] = React.useState<string>("");

	useEffect(() => {
		setSummary(sessionStorage.getItem("transcriptSummary") || "");
	}, [sessionStorage.getItem("transcriptSummary")]);
	// const summary_data = `<p>
	// <br>
    //   The patient mentioned feeling <strong>tired most of the time</strong>, along with experiencing <strong>increased thirst</strong> and <strong>frequent urination</strong>. 
    //   These symptoms came up during a discussion about his recent lifestyle habits and lab results.<br/>
    //   He also seemed concerned about how long the fatigue has been going on. 
    //   Given the combination of symptoms and his history, it might be worth focusing on possible <em>metabolic issues like Type 2 Diabetes</em> or other <em>cardiovascular risks</em> as next steps.
    // </p>`;


	return (
		<div
			className="text-lg text-white"
			dangerouslySetInnerHTML={{
				__html: summary,
			}}
		/>
	);
};

export default SummaryGridContent;
