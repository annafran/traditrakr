interface Note {
  note: string;
  key: string;
}

export interface Job {
  jobId: string;
  createdDate: Date;
  clientName: string;
  clientEmail: string;
  jobName: string;
  clientPhoneNumber: string;
  notes: Note[];
  status: string;
}
