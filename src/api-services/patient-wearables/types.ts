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

export interface ISleepList {
  date: string;
  source: {
    provider: string;
    device: string;
  };
  start_time: string;
  end_time: string;
  duration_minutes: number;
  time_in_bed_minutes: number;
  efficiency_percent: number;
  stages: {
    awake_minutes: number;
    light_minutes: number;
    deep_minutes: number;
    rem_minutes: number;
  };
  interruptions_count: null;
  nap_count: number;
  nap_duration_minutes: number;
  avg_heart_rate_bpm: number;
  avg_hrv_sdnn_ms: number;
  avg_respiratory_rate: number;
  avg_spo2_percent: number;
}

export interface ISummariesResponse<T> {
  data: T[];
}
