import React from "react";

const SummaryGridContent = () => {
	const summary_data = `<p>
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    <strong>Important:</strong> This is a <em>summary</em> of the data.
    </p>`;

	return (
		<div
			className="text-lg text-gray-800"
			dangerouslySetInnerHTML={{
				__html: summary_data,
			}}
		/>
	);
};

export default SummaryGridContent;
