import { onBoardingApiServices } from "./api";
import type { EmrInstance } from "./type";

export const getEmrInstances = () =>
    onBoardingApiServices.getEmrInstances<EmrInstance[]>();
