'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils';
import CustomAuthFormField from '../custom/CustomAuthFormField';
import { Loader2 } from 'lucide-react';
import { State, City, Gender } from '@/lib/types';

interface AuthFormProps {
  type:'login' | 'register'
  states?: State[];
  cities?: City[];
  selectedState?: string;
  handleStateChange?: (value: string) => void;
  loadingCities?: boolean;
}

const AuthForm = ({type, states, cities, selectedState, handleStateChange, loadingCities}:AuthFormProps) => {
  const [step, setStep] = useState(1);
  const [isLoading, setisLoading] = useState(false)
  //const [storedValues, setStoredValues] = useState({ email: '', password: '' });
  const formSchema = authFormSchema(type);
  const gender : Gender[] = [
    {name: "Male"},
    {name: "Female"},
    {name: "Other"}
  ]

  /* const handleNextClick = () => {
    resolver: zodResolver(formSchema)
    setStep(2)
  }; */

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chronicDiseases: "",
      timeStamp: new Date().toISOString(),
    },
  })
 
  // 2. Define a submit handler.
  /* function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Button Clicked")
    setisLoading(true)
    console.log(values)
    setisLoading(false)
  } */

  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleNextClick = async () => {
    const isValid = await form.trigger(['email', 'password', 'confirmPassword']);
    if (isValid) {
      setStep(2);
    }
  };

  

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (type === 'register' && step === 1) {
      // Validate Step 1 and move to Step 2
      trigger(['email', 'password', 'confirmPassword']).then((valid) => {
        if (valid) setStep(2);
      });
    } else {
      // Final submission for Step 2
      console.log("Form submitted", values);
    }
  };


//lg:min-h-[600px] xl:min-h-[800px]

  return (
    <div className="w-full h-screen flex flex-col lg:grid lg:grid-cols-2 px-6 lg:px-0 overflow-hidden">
      <div className="hidden lg:flex items-center justify-center bg-gray-400">
        {/* Add any additional content for the second column here */}
      </div>
      <div className="flex flex-col flex-1 items-center justify-center py-10">
        <div className="mx-auto grid justify-center w-full max-w-[350px] gap-6">
          <div className="grid gap-2 text-center">
             <h1 className="text-3xl font-bold">{type === 'register' ? 'Register' : 'Login'}</h1>
             <p className="text-balance text-muted-foreground">
               {type === 'register' ? 'Enter your email below to create your account' : 'Enter your email below to login to your account'}
             </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {(type === 'register' && step === 2) && (
                  <div className='grid gap-4'>
                    <div className='flex gap-4'>
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
                    <div className='flex gap-4'>
                      <CustomAuthFormField
                        formControl={form.control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        placeholder=""
                        id="dateOfBirth"
                        type="dateOfBirth"
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
                      {...(type === 'login' && { showForgotPassword: true })}
                    />
                    {type === 'register' && (
                      <div className='pb-1'>
                      <CustomAuthFormField
                        formControl={form.control}
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Enter your Password Again"
                        id="confirmPassword"
                        type="password"
                      /></div>
                    )}
                  </>
                )}
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 size={20}
                      className='animate-spin'/> &nbsp;
                      Loading...
                    </>
                  ) : (type === 'register' && step === 1) ? 'Submit' : type === 'register' ? 'Register' : 'Login'}
                </Button>
                {/* {(type !== 'register' || step!== 1) && (
                  <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 size={20}
                      className='animate-spin'/> &nbsp;
                      Loading...
                    </>
                  ) : type === 'register' ? 'Register' : 'Login'}
                </Button>
                )} */}
              </form>
            </Form>
            {(type === 'register' && step === 1) && (
              <Button onClick={handleNextClick} className="w-full">
                Next
              </Button>
            )}
            {step === 1 && (
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            )}
          </div>
          <div className="text-center text-sm mt-1">
            {type === 'register' ? 'Already have an account?' : "Don't have an account?"}
            {" "}
            <Link href={type === 'register' ? '/login' : '/register'} className="underline">
              {type === 'register' ? 'Sign in' : 'Sign up'}
            </Link>
          </div>            
        </div>
      </div>
    </div> 
  )
}
  

    /*{ <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        />
        
        <Button type="submit">Submit</Button>
      </form>
    </Form> }*/

const AuthShadForm = ({type}:{type:string}) => {
  return (
     <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
       <div className="flex items-center justify-center py-12">
         <div className="mx-auto grid w-[350px] gap-6">
           <div className="grid gap-2 text-center">
             <h1 className="text-3xl font-bold">{type === 'register' ? 'Register' : 'Login'}</h1>
             <p className="text-balance text-muted-foreground">
               {type === 'register' ? 'Enter your email below to create your account' : 'Enter your email below to login to your account'}
             </p>
           </div>
           <div className="grid gap-4">
             <div className="grid gap-2">
               <Label htmlFor="email">Email</Label>
               <Input
                 id="email"
                 type="email"
                 placeholder="m@example.com"
                 required
               />
             </div>
             <div className="grid gap-2">
               <div className="flex items-center">
                 <Label htmlFor="password">Password</Label>
                 <Link
                   href="/forgot-password"
                   className="ml-auto inline-block text-sm underline"
                 >
                   Forgot your password?
                 </Link>
               </div>
               <Input id="password" type="password" required />
             </div>
             <Button type="submit" className="w-full">
               Login
             </Button>
             <Button variant="outline" className="w-full">
               Login with Google
             </Button>
           </div>
           <div className="mt-4 text-center text-sm">
             Don&apos;t have an account?{" "}
             <Link href="#" className="underline">
               Sign up
             </Link>
           </div>
         </div>
       </div>
       <div className="hidden bg-muted lg:block">
         <Image
           src="/placeholder.svg"
           alt="Image"
           width="1920"
           height="1080"
           className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
         />
       </div>
     </div>
  )
 }

export default AuthForm