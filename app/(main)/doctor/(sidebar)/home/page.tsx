"use client";

import React, { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

const mockUsers = [
  {
    user_id: 1,
    user_name: "Sarvesh Biwalkar",
    user_email: "sarvesh@example.com",
    user_phone: "123-456-7890",
  },
  {
    user_id: 2,
    user_name: "Vaibhav Kusalkar",
    user_email: "vaibhav@example.com",
    user_phone: "987-654-3210",
  },
  {
    user_id: 3,
    user_name: "Tushar Bansod",
    user_email: "tushar@example.com",
    user_phone: "555-123-4567",
  },
  {
    user_id: 4,
    user_name: "Atharv Bhujbal",
    user_email: "atharv@example.com",
    user_phone: "555-184-5538",
  },
];

const DoctorHome = () => {
    const [searchInput, setSearchInput] = useState(""); // State to store the search input
    const [searchResults, setSearchResults] = useState([]); // State to store the results
    const [isLoading, setIsLoading] = useState(false); // State to handle loading

    // Function to handle search (static filtering)
    const handleSearch = (input: string) => {
        if (!input.trim()) {
            setSearchResults([]);
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const filtered = mockUsers.filter(
                (user) =>
                    user.user_name.toLowerCase().includes(input.toLowerCase()) ||
                    user.user_email.toLowerCase().includes(input.toLowerCase()) ||
                    user.user_phone.includes(input)
            );
            setSearchResults(filtered);
            setIsLoading(false);
        }, 400); // Simulate async delay
    };

    return (
        <div className="min-h-screen p-6 bg-background">
            <h1 className="text-3xl font-bold text-white text-center mb-6">
                Select Patient
            </h1>
            <div className="max-w-md mx-auto">
                <Command className="rounded-lg border shadow-md">
                    <CommandInput
                        placeholder="Search by name, email, or phone..."
                        value={searchInput}
                        onValueChange={(value) => {
                            setSearchInput(value);
                            handleSearch(value);
                        }}
                    />
                    {searchInput.trim() && (
                        <CommandList
                            className={`transition-all duration-300 ease-in-out transform ${
                                searchInput.trim()
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-4"
                            }`}
                        >
                            <CommandEmpty>
                                {isLoading ? "Searching..." : "No results found."}
                            </CommandEmpty>
                            {searchResults.length > 0 && (
                                <CommandGroup heading="Search Results">
                                    {searchResults.map((user) => (
                                        <CommandItem
                                            key={user.user_id}
                                            onSelect={() => {
                                                console.log("Selected User:", user);
                                                setSearchInput(user.user_name);
                                            }}
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {user.user_name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {user.user_email}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {user.user_phone}
                                                </p>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    )}
                </Command>
            </div>
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
