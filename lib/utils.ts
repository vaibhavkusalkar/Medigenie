import { clsx, type ClassValue } from "clsx"
import { timeStamp } from "console"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authFormSchema = (type: 'login' | 'register') => {
  return z.object({
    firstName: type === 'login' ? z.string().optional() : z.string().min(3).max(25),
    lastName: type === 'login' ? z.string().optional() : z.string().min(3).max(25),
    state: type === 'login' ? z.string().optional() : z.string(),
    city: type === 'login' ? z.string().optional() : z.string(),
    dateOfBirth: type === 'login' ? z.string().optional() : z.string().date(),
    gender: type === 'login' ? z.string().optional() : z.string(),
    phoneNumber: type === 'login' ? z.string().optional() : z.string().regex(/^[6-9]\d{9}$/, { message: "Invalid Phone number" }),
    aadhaarNumber: type === 'login' ? z.string().optional() : z.string().regex(/^\d{12}$/, { message: "Invalid Aadhaar number" }),
    role: type === 'login' ? z.string().optional() : z.string(),
    chronicDiseases: z.string().optional(),
    timeStamp: type === 'login' ? z.string().optional() : z.string().datetime(),
    registrationNumber: type === 'login' ? z.string().optional() : z.string().min(9).max(12),
    hospital: type === 'login' ? z.string().optional() : z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: type === 'login' ? z.string().optional() : z.string().min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ['confirmPassword'],
  });
};


/* export const authFormSchema = (type : 'login' | 'register') => z.object({
  // register params
  firstName: type === 'login' ? z.string().optional() : z.string().min(3).max(25),
  lastName: type === 'login' ? z.string().optional() : z.string().min(3).max(25),
  //state: type === 'login' ? z.string().optional() : z.string(),
  //city: type === 'login' ? z.string().optional() : z.string(),
  dateOfBirth: type === 'login' ? z.string().optional() : z.string().date(),
  gender: type === 'login' ? z.string().optional() : z.string(),
  phoneNumber: type === 'login' ? z.string().optional() : z.string().regex(/^[6-9]\d{9}$/, { message: "Invalid Phone number" }),
  chronicDiseases: z.string().optional(),
  timeStamp: type === 'login' ? z.string().optional() : z.string().datetime(),
  //registrationNumber: type === 'login' ? z.string().optional() : z.string().min(9).max(12),
  //hospital: type === 'login' ? z.string().optional() : z.string(),
  

  // login params
  email: z.string()
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  confirmPassword: type === 'login' ? z.string().optional() : z.string(),
  }).superRefine((data, ctx) => {
    if (type === 'register' && data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords does not match",
        path: ["confirmPassword"],
      });
    }
  }
) */