import { onBoardingApiServices } from "./api";
import type { EmrInstance } from "./types";

export const getEmrInstances = () =>
    onBoardingApiServices.getEmrInstances<EmrInstance[]>();
