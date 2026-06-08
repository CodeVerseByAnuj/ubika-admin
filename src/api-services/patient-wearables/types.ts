export type ISummaryType = "activity" | "recovery" | "sleep" | "body";

export interface IActivityList {
  date: string;
  source: {
    provider: string;
    device: string;
  };
  steps: number;
  distance_meters: number;
  floors_climbed: number;
  elevation_meters: number;
  active_calories_kcal: number;
  total_calories_kcal: number;
  active_minutes: number;
  sedentary_minutes: number;
  intensity_minutes: {
    light: number;
    moderate: number;
    vigorous: number;
  };
  heart_rate: {
    avg_bpm: number;
    max_bpm: number;
    min_bpm: number;
  };
}

export interface ISummariesResponse {
  data: IActivityList[];
}
