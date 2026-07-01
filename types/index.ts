export interface SubmissionFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  dob: string; // YYYY-MM-DD
  address: string;
  story: string;
  location: string;
  rawImage: FileList | null;
  editedImage: FileList | null;
}

export interface SubmissionData {
  id?: string;
  full_name: string;
  mobile_number: string;
  email: string;
  dob: string;
  address: string;
  story: string;
  location: string;
  raw_image_url: string;
  edited_image_url: string;
  submission_status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  error?: string;
}
