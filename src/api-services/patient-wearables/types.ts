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

export interface IDataSummary {
  user_id: string;
  total_data_points: number;
  total_workouts: number;
  total_sleep_events: number;
  series_type_counts: {
    // All known series types from your data
    heart_rate: number;
    energy: number;
    steps: number;
    distance_walking_running: number;
    basal_energy: number;
    headphone_audio_exposure: number;
    flights_climbed: number;
    respiratory_rate: number;
    environmental_audio_exposure: number;
    cadence: number;
    power: number;
    running_power: number;
    running_speed: number;
    swimming_stroke_count: number;
    blood_pressure_diastolic: number;
    blood_glucose: number;
    oxygen_saturation: number;
    stand_time: number;
    time_in_daylight: number;
    skin_temperature: number;
    blood_pressure_systolic: number;
    body_temperature: number;
    resting_heart_rate: number;
    heart_rate_variability_sdnn: number;
    exercise_time: number;
    body_fat_percentage: number;
    vo2_max: number;
    weight: number;
  };
  workout_type_counts: {
    [workoutName: string]: number; // Covers any workout type, no need to list 100+ keys
  };
  by_provider: Array<{
    provider: "suunto" | "apple" | "unknown" | "oura";
    data_points: number;
    series_counts: {
      [metricName: string]: number; // Each provider can have different metrics
    };
    workout_count: number;
    sleep_count: number;
  }>;
}

export interface ISummariesResponse<T> {
  data: T;
}
