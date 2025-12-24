import * as z from "zod";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const registerFormSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const forgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => !val || /^0(?:3[2-9]|5[68]|7[06-9]|8[1-5]|88|9[0-6]|9[89])[0-9]{7}$/.test(val),
      "Please enter a valid phone number",
    ),
  shippingAddress: z.string().min(5, "Address must be at least 5 characters"),
  shippingCity: z.string().min(2, "City must be at least 2 characters"),
  shippingProvince: z.string().min(2, "Province must be at least 2 characters"),
  shippingPostalCode: z
    .string()
    .regex(/^[A-Za-z0-9][A-Za-z0-9\-\s]{1,9}$/, "Please enter a valid Postal code"),
  shippingCountry: z.string().min(2, "Country is required"),
});

const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^0(?:3[2-9]|5[68]|7[06-9]|8[1-5]|88|9[0-6]|9[89])[0-9]{7}$/.test(val),
      "Please enter a valid phone number",
    ),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export {
  loginFormSchema,
  registerFormSchema,
  forgotPasswordFormSchema,
  resetPasswordFormSchema,
  checkoutFormSchema,
  profileFormSchema,
};
