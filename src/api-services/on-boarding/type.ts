import { z } from "zod";

export const OnBoardingSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["male", "female", "other"], {
        error: "Gender is required",
    }),
    dob: z.string().min(1, "Date of birth is required"),
});

export const OnPolicyConsentSchema = z.object({
    consent_policy_id: z.number().min(1, "Policy ID is required"),
});

export type OnPolicyConsent = z.infer<typeof OnPolicyConsentSchema>;

export type ConsentPolicy = {
    id: number;
    name: string;
    body: string;
    effective_date: string;
};

export type OnBoardingFormData = z.infer<typeof OnBoardingSchema>;

export type OnBoardingPayload = {
    first_name: string;
    last_name: string;
    sex: "Male" | "Female" | "Other";
    dob: string;
};
