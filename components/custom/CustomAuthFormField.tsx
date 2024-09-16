import React from "react";
import {
	FormControl,
	FormField,
	FormLabel,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";
import Link from "next/link";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const formSchema = authFormSchema("register");

interface CustomAuthFormFieldProps {
	formControl: Control<z.infer<typeof formSchema>>;
	name: FieldPath<z.infer<typeof formSchema>>;
	label: string;
	placeholder?: string;
	id: string;
	type: string;
	options?: { name: string; iso?: string }[];
	customOnChange?: (value: string) => void;
	isDisabled?: boolean;
}

const CustomAuthFormField = ({
	formControl,
	name,
	label,
	placeholder,
	id,
	type,
	options,
	customOnChange,
	isDisabled,
}: CustomAuthFormFieldProps) => {
	return (
		<FormField
			control={formControl}
			name={name}
			render={({ field }) => (
				<div className="grid gap-2">
					<FormItem>
						{name === "password" ? (
							<>
								<div className="flex items-center">
									<FormLabel htmlFor={name}>
										{label}
									</FormLabel>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline"
									>
										Forgot your password?
									</Link>
								</div>
								<FormControl>
									<Input
										id={id}
										type={type}
										{...(placeholder
											? { placeholder }
											: {})}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</>
						) : type === "dropdown" ? (
							<>
								<FormLabel htmlFor={name}>{label}</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											field.onChange(value); // Update form state
											if (customOnChange)
												customOnChange(value); // Call additional onChange if provided
										}}
										defaultValue={field.value || ""}
										disabled={isDisabled}
									>
										<SelectTrigger
											className={`w-[180px] ${
												field.value
													? ""
													: "text-gray-400"
											}`}
										>
											<SelectValue
                        						id={id}
												placeholder={placeholder}
											/>
										</SelectTrigger>
										<SelectContent>
											{options?.map((options, index) => (
												<SelectItem
													key={index}
													value={options.name}
                          //value={options.iso || options.name}  
												>
													{options.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</>
						) : (
							<>
								<FormLabel htmlFor={name}>{label}</FormLabel>
								<FormControl>
									<Input
										id={id}
										type={type}
										{...(placeholder
											? { placeholder }
											: {})}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</>
						)}
					</FormItem>
				</div>
			)}
		/>
	);
};

export default CustomAuthFormField;

{
	/*<FormItem>
      <FormLabel>State</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state, index) => (
              <SelectItem key={index} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem> */
}

/*
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
})

export function SelectForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

*/
