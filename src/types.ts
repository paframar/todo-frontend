export interface Duty {
  id: string;
  name: string;
}

export interface DutiesContextValue {
  duties: Duty[];
  error: string | null;
  getDuties: () => Promise<void>;
  newDuty: (duty: Duty) => Promise<void>;
  editDuty: (duty: Duty) => Promise<void>;
  deleteDuty: (id: string) => Promise<void>;
}
