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
  interruptions_count: number;
  nap_count: number;
  nap_duration_minutes: number;
  avg_heart_rate_bpm: number;
  avg_hrv_sdnn_ms: number;
  avg_respiratory_rate: number;
  avg_spo2_percent: number;
}

export interface IBody {
  source: {
    provider: string;
    device: string;
  };

  slow_changing: {
    weight_kg: number | null;
    height_cm: number | null;
    body_fat_percent: number | null;
    muscle_mass_kg: number | null;
    bmi: number | null;
    age: number | null;
  };

  averaged: {
    period_days: number;
    resting_heart_rate_bpm: number | null;
    avg_hrv_sdnn_ms: number | null;
    avg_hrv_rmssd_ms: number | null;
    period_start: string;
    period_end: string;
  };

  latest: {
    body_temperature_celsius: number | null;
    body_temperature_measured_at: string | null;

    skin_temperature_celsius: number | null;
    skin_temperature_measured_at: string | null;

    blood_pressure: {
      systolic: number;
      diastolic: number;
    } | null;

    blood_pressure_measured_at: string | null;
  };
}

export interface ISummariesResponse<T> {
  data: T;
}
