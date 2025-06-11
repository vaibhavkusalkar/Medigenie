"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import CustomAuthFormField from "../custom/CustomAuthFormField";
import { Loader2 } from "lucide-react";
import { State, City, Gender } from "@/lib/types";
import { format } from "date-fns";
import axios from "axios";
import { LoginResponse, RegisterResponse } from "@/types/api";

interface AuthFormProps {
	type: "login" | "register";
	states?: State[];
	cities?: City[];
	selectedState?: string;
	handleStateChange?: (value: string) => void;
	loadingCities?: boolean;
}

const AuthForm = ({
	type,
	states,
	cities,
	selectedState,
	handleStateChange,
	loadingCities,
}: AuthFormProps) => {
	const [step, setStep] = useState(1);
	const [isLoading, setisLoading] = useState(false);
	//const [storedValues, setStoredValues] = useState({ email: '', password: '' });
	const formSchema = authFormSchema(type);
	const gender: Gender[] = [
		{ name: "Male" },
		{ name: "Female" },
		{ name: "Other" },
	];

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			chronicDiseases: "",
			timeStamp: new Date().toISOString(),
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = form;

	const handleNextClick = async () => {
		const isValid = await form.trigger([
			"email",
			"password",
			"confirmPassword",
		]);
		if (isValid) {
			setStep(2);
		}
	};

		const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
			alert("Submitted!");
			console.log("onFormSubmit called", values);
		};

	/* 	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log("onSubmit called with values:", values);
		console.log("Step:", step);
		if (type === "register") {
			if (step === 1) {
			  setStep(2);
			  return; // ⛔️ Prevent submit from continuing in step 1
			} else if (step === 2) {
			  console.log("Register submitted:", values);
			}
		  } else if (type === "login") {
			console.log("Login submitted:", values);
		  }		  
	}; */

	//lg:min-h-[600px] xl:min-h-[800px]

	return (
		<div className="w-full h-screen flex flex-col lg:grid lg:grid-cols-2 px-6 lg:px-0 overflow-hidden">
			<div className="hidden lg:flex items-center justify-center bg-gray-950">
				{/* Add any additional content for the second column here */}
				<Image
					src='/assets/images/illustration.svg'
					alt="Auth Illustration"
					width={500}
					height={500}
					className="object-cover"/>
			</div>
			<div className="flex flex-col flex-1 items-center justify-center py-10">
				<div className="mx-auto grid justify-center w-full max-w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">
							{type === "register" ? "Register" : "Login"}
						</h1>
						<p className="text-balance text-muted-foreground">
							{type === "register"
								? "Enter your email below to create your account"
								: "Enter your email below to login to your account"}
						</p>
					</div>
					<div className="grid gap-4">
						<Form {...form}>
							<form
								onSubmit={handleSubmit(onFormSubmit)}
								className="space-y-5"
							>
								{type === "register" && step === 2 && (
									<div className="grid gap-4">
										<div className="flex gap-4">
											<CustomAuthFormField
												formControl={form.control}
												name="firstName"
												label="First Name"
												placeholder=""
												id="firstName"
												type="firstName"
											/>
											<CustomAuthFormField
												formControl={form.control}
												name="lastName"
												label="Last Name"
												placeholder=""
												id="lastName"
												type="lastName"
											/>
										</div>
										<CustomAuthFormField
											formControl={form.control}
											name="phoneNumber"
											label="Phone Number"
											placeholder="Enter your Phone Number"
											id="phoneNumber"
											type="phoneNumber"
										/>
										<CustomAuthFormField
											formControl={form.control}
											name="aadhaarNumber"
											label="Aadhaar Number"
											placeholder="Enter your Aadhaar Number"
											id="aadhaarNumber"
											type="aadhaarNumber"
										/>
										<div className="flex gap-4">
											<CustomAuthFormField
												formControl={form.control}
												name="dateOfBirth"
												label="Date of Birth"
												placeholder=""
												id="dateOfBirth"
												type="calender"
											/>
											<CustomAuthFormField
												formControl={form.control}
												name="gender"
												label="Gender"
												placeholder="Select Gender"
												id="gender"
												type="dropdown"
												options={gender}
											/>
										</div>
										<CustomAuthFormField
											formControl={form.control}
											name="chronicDiseases"
											label="Chronic Diseases"
											placeholder="Enter your chronic diseases (if any)"
											id="chronicDiseases"
											type="chronicDiseases"
										/>
									</div>
								)}
								{step === 1 && (
									<>
										<CustomAuthFormField
											formControl={form.control}
											name="email"
											label="Email"
											placeholder="Enter your Email"
											id="email"
											type="email"
										/>

										<CustomAuthFormField
											formControl={form.control}
											name="password"
											label="Password"
											placeholder="Enter your Password"
											id="password"
											type="password"
											{...(type === "login" && {
												showForgotPassword: true,
											})}
										/>
										{type === "register" && (
											<div className="pb-1">
												<CustomAuthFormField
													formControl={form.control}
													name="confirmPassword"
													label="Confirm Password"
													placeholder="Enter your Password Again"
													id="confirmPassword"
													type="password"
												/>
											</div>
										)}
									</>
								)}
								{((type === "register" && step === 2) ||
									type === "login") && (
									<Button
										type="submit"
										// disabled={isLoading}
										className="w-full"
									>
										{isLoading ? (
											<>
												<Loader2
													size={20}
													className="animate-spin"
												/>{" "}
												&nbsp; Loading...
											</>
										) : type === "login" ? (
											"Login"
										) : (
											"Register"
										)}
									</Button>
								)}
							</form>
						</Form>
						{type === "register" && step === 1 && (
							<Button
								onClick={handleNextClick}
								className="w-full"
							>
								Next
							</Button>
						)}
						<Button variant="outline" className="w-full">
							{type === "login"
								? "Login with Google"
								: "Register with Google"}
						</Button>
					</div>
					<div className="text-center text-sm mt-1">
						{type === "register"
							? "Already have an account?"
							: "Don't have an account?"}{" "}
						<Link
							href={type === "register" ? "/login" : "/register"}
							className="underline"
						>
							{type === "register" ? "Sign in" : "Sign up"}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
