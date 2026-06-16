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
