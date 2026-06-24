export interface IPagination {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface IAllergies {
  id: number;
  type: string;
  allergy_name: string;
  effectiveAt: string;
  attributes: {
    allergy_group_name: string;
    allergy_type: string;
    clinical_status: string;
    allergy_severity_code: string;
    reaction_code: string;
    reaction_count: number;
    drug_identifier_code_system: string;
    drug_identifier_value: string;
    has_no_known_allergies_flag: boolean;
    no_known_allergies_count: number;
    reaction_description: string;
  };
  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}

export interface IAllergiesResponse {
  data: IAllergies[];
  meta: IPagination;
}

export interface IAppointment {
  id: number;
  type: string;
  appointment_start_time: string;
  appointment_end_time: string;
  attributes: {
    service_location: string;
    appointment_uuid: string;
    is_cancelled: boolean;
    is_deleted: boolean;
    is_confirmed: boolean;
    has_arrived: boolean;
    is_bill_only: boolean;
    office_id: number;
    provider_id: number;
    billing_provider_id: number;
    appointment_type_id: number;
    reason_id: number;
  };
  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}

export interface IAppointmentsResponse {
  data: IAppointment[];
  meta: IPagination;
}

export interface IAppointmentDetailsResposne {
  data: {
    id: number;
    type: string;
    appointment_start_time: string;
    appointment_end_time: string;
    attributes: {
      service_location: string;
      appointment_uuid: string;
      is_cancelled: boolean;
      is_deleted: boolean;
      is_confirmed: boolean;
      has_arrived: boolean;
      is_bill_only: boolean;
      office_id: number;
      provider_id: number;
      billing_provider_id: number;
      appointment_type_id: number;
      reason_id: number;
      other_provider_ids_json: string[];
    };
    provenance: {
      sourceSystem: string;
      sourceRecordType: string;
      lastSyncedAt: string;
    };
  };
}

export interface ICondition {
  id: string;
  type: string;
  condition_description: string;
  effectiveAt: string;
  attributes: {
    condition_code: string;
    condition_code_system: string;
    condition_status_name: string;
    is_active_condition: boolean;
    is_resolved: boolean;
    is_negative: boolean;
    finding_type: string;
    condition_onset_ts: string;
    condition_recovery_ts: string;
    days_since_diagnosed: number;
    days_since_onset: number;
  };
  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}

export interface IConditionsResponse {
  data: ICondition[];
  meta: IPagination;
}

export interface IHistory {
  id: number;
  type: string;
  history_description: string;
  effectiveAt: string;

  attributes: {
    history_type: string;
    history_type_id: number;

    is_active: boolean;
    is_negative: boolean;
    is_resolved: boolean;

    finding_type: string;

    location_abbreviation: string;
    location_name: string;

    history_regular_location_abbreviation: string;
    history_regular_location_name: string;

    history_regular_item_id: number;
    history_regular_item_active: boolean;

    details: string;
    note: string;
    treatment: string;
  };

  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}

export interface IHistoryResposne {
  data: IHistory[];
  meta: IPagination;
}

export interface IMedication {
  id: number;
  type: string;
  medication_name: string;
  effectiveAt: string;
  attributes: {
    instructions_display_text: string;
    route: string;
    prescription_status: string;
    type_of_use: string;
    is_external: boolean;
    effective_date: string;
    written_ts: string;
    dose_min: number;
    dose_max: number;
    dose_unit: string;
    dose_range_text: string;
    duration_amount: number;
    duration_unit: string;
    interval_time: string;
    is_prn: boolean;
    is_concurrent: boolean;
    generic_drug_name: string;
    prescribing_provider_id: number;
    dosage_start_ts: string;
  };
  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}

export interface IMedicationsResposne {
  data: IMedication[];
  meta: IPagination;
}

export interface IMedicationDetailsResponse {
  data: {
    id: number;
    type: string;
    medication_name: string;
    effectiveAt: string;

    attributes: {
      instructions_display_text: string | null;
      route: string | null;
      prescription_status: string | null;
      type_of_use: string | null;

      is_external: boolean;

      effective_date: string | null;
      written_ts: string | null;
      dosage_start_ts: string | null;
      prescription_last_modified_ts: string | null;

      dose_min: number | null;
      dose_max: number | null;
      dose_unit: string | null;
      dose_range_text: string | null;

      duration_amount: number | null;
      duration_unit: string | null;
      interval_time: string | null;

      is_prn: boolean;
      is_concurrent: boolean;

      generic_drug_name: string | null;
      generic_id: number | null;

      prescribing_provider_id: number | null;

      ingredient_count: string | null;

      eye_code_name: string | null;
      eye_code_abbreviation: string | null;

      dosage_id: number | null;

      note: string | null;
    };

    provenance: {
      sourceSystem: string;
      sourceRecordType: string;
      lastSyncedAt: string;
    };
  };
}

export interface ILab {
  id: number;
  type: string;
  observation_label: string;
  effectiveAt: string;

  attributes: {
    observation_value: string;
    observation_value_numeric: string;
    observation_units?: string;

    observation_status: string | null;
    observation_range: string | null;
    lower_range: string | null;
    upper_range: string | null;
    in_reference_range: boolean | null;
    observation_flag?: string;

    collection_ts: string;
    observation_ts: string;

    is_active: boolean;
    review_with_patient: boolean;

    lab_group_id: number;
    base_group_id: number;
    test_id: number;

    result_id: string;
    source_id: number;

    performing_lab?: string;
    specimen_source?: string;
    observational_result_status?: string;
    result_status?: string;
  };

  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}

export interface ILabObservation {
  observation_label: string;
  results: ILab[];
}

export interface ILabDateGroup {
  date: string;
  observations: ILabObservation[];
}

export interface ILabsResposne {
  data: ILabDateGroup[];
  meta: IPagination;
}

export interface ILabDetailsResponse {
  data: {
    id: number;
    type: string;
    observation_label: string;
    effectiveAt: string;

    attributes: {
      observation_value: string;
      observation_value_numeric: string;
      observation_units: string;

      collection_ts: string;
      observation_ts: string;

      is_active: boolean;
      review_with_patient: boolean;

      lab_group_id: number;
      base_group_id: number;
      test_id: number;

      result_id: string;
      source_id: number;

      external_note: string | null;
      transaction_ts: string | null;
      version_ts: string | null;
    };

    provenance: {
      sourceSystem: string;
      sourceRecordType: string;
      lastSyncedAt: string;
    };
  };
}

export interface IMedicalTileSummaryResposne {
  bp_latest: number | null;
  hba1c_latest: number | null;
  med_count_active: number | null;
  weight_latest:number | null
  next_visit_date: string | null;
  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}

export interface ILetter {
  id: number;
  type: string;
  title: string;
  content: string;
  generatedSummary: string | null;
  effectiveAt: string;
  attributes: {
    letter_id: number;
    appointment_id: number;
    letter_type_id: number;
    letter_status: string;
    read_status: string;
    letter_version: number;
    is_active_version: boolean;
    is_archived: boolean;
    is_deleted: boolean;
    is_letter_read: boolean;
    physician_id: number;
    modified_ts: string;
    reviewed_ts: string;
    days_since_created: number;
    days_since_modified: number;
  };
  provenance: {
    sourceSystem: string;
    sourceRecordType: string;
    lastSyncedAt: string;
  };
}
export interface ILettersResposne {
  data: ILetter[];
  meta: IPagination;
}

export interface ILettersDetailsResponse {
  data: {
    id: number;
    type: string;
    title: string;
    content: string;
    generatedSummary: string | null;
    effectiveAt: string;
    styled_content: string | null;

    attributes: {
      letter_id: number;
      appointment_id: number;
      letter_type_id: number;

      letter_status: string;
      read_status: string;

      letter_version: number;

      is_active_version: boolean;
      is_archived: boolean;
      is_deleted: boolean;
      is_letter_read: boolean;

      physician_id: number;

      modified_ts: string;
      reviewed_ts: string;

      days_since_created: number;
      days_since_modified: number;

      is_xml: boolean;
      is_locked: boolean;
    };

    provenance: {
      sourceSystem: string;
      sourceRecordType: string;
      lastSyncedAt: string;
    };
  };
}
