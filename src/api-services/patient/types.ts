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
    has_no_known_allergies_flag: false;
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
