import { onBoardingApiServices } from "./api";
import type { EmrLinkingFormData } from "./types";

export const createEmrLinking = (data: EmrLinkingFormData) =>
  onBoardingApiServices.createEmrLinking<{ message: string }>(data);
