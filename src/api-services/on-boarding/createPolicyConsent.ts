import { onBoardingApiServices } from "./api";
import type { OnPolicyConsent } from "./type";

export const createPolicyConsent = (data: OnPolicyConsent) =>
    onBoardingApiServices.createPrivacy<{ message: string }>(data);
