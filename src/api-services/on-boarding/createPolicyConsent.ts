import { onBoardingApiServices } from "./api";
import type { OnPolicyConsent } from "./types";

export const createPolicyConsent = (data: OnPolicyConsent) =>
  onBoardingApiServices.createPrivacy<{ message: string }>(data);
