import { supabase, supabaseAdmin } from '../lib/supabase';
import { SubmissionData } from '../types';

// Enforce that we use the Admin client for backend operations, which is more robust
const client = supabaseAdmin;

/**
 * Uploads a file to Supabase Storage in the specified folder inside 'contest-submissions' bucket.
 * Returns the public URL of the uploaded asset.
 */
export async function uploadFileToStorage(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  folder: 'raw-images' | 'edited-images'
): Promise<{ filePath: string; publicUrl: string }> {
  // Generate a unique filename: prefix with timestamp + random string to avoid overwrites
  const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  // Clean filename: remove special characters but keep extension
  const fileExt = fileName.split('.').pop() || 'png';
  const cleanName = fileName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const finalPath = `${folder}/${uniqueId}_${cleanName}.${fileExt}`;

  // Upload file buffer
  const { data, error } = await client.storage
    .from('contest-submissions')
    .upload(finalPath, fileBuffer, {
      contentType,
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload file ${fileName} to ${folder}: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = client.storage
    .from('contest-submissions')
    .getPublicUrl(finalPath);

  if (!urlData || !urlData.publicUrl) {
    throw new Error(`Failed to retrieve public URL for uploaded file: ${finalPath}`);
  }

  return {
    filePath: finalPath,
    publicUrl: urlData.publicUrl,
  };
}

/**
 * Deletes a file from Supabase Storage (used for rollbacks).
 */
export async function deleteFileFromStorage(filePath: string): Promise<void> {
  const { error } = await client.storage
    .from('contest-submissions')
    .remove([filePath]);

  if (error) {
    console.error(`Rollback Error: Failed to delete file ${filePath} from storage:`, error.message);
  } else {
    console.log(`Rollback Success: Deleted file ${filePath} from storage.`);
  }
}

/**
 * Checks if a submission already exists with the same email or mobile number.
 */
export async function checkDuplicateSubmission(
  email: string,
  mobileNumber: string
): Promise<{ isDuplicate: boolean; reason?: string }> {
  // Check email (case-insensitive search in Supabase using `ilike` or querying and comparing)
  // Let's do a query filtering by email ilike or mobile_number eq.
  const { data, error } = await client
    .from('photography_contest_submissions')
    .select('email, mobile_number')
    .or(`email.ilike.${email.trim()},mobile_number.eq.${mobileNumber.trim()}`)
    .limit(1);

  if (error) {
    throw new Error(`Database error while checking duplicate submissions: ${error.message}`);
  }

  if (data && data.length > 0) {
    const matched = data[0];
    const isEmailMatch = matched.email.toLowerCase() === email.trim().toLowerCase();
    const isMobileMatch = matched.mobile_number === mobileNumber.trim();
    
    if (isEmailMatch && isMobileMatch) {
      return { isDuplicate: true, reason: 'You have already submitted an entry with this email and mobile number.' };
    } else if (isEmailMatch) {
      return { isDuplicate: true, reason: 'You have already submitted an entry with this email address.' };
    } else {
      return { isDuplicate: true, reason: 'You have already submitted an entry with this mobile number.' };
    }
  }

  return { isDuplicate: false };
}

/**
 * Inserts a new submission record into the database.
 */
export async function insertSubmission(
  submission: SubmissionData
): Promise<SubmissionData> {
  const { data, error } = await client
    .from('photography_contest_submissions')
    .insert([
      {
        full_name: submission.full_name,
        mobile_number: submission.mobile_number,
        email: submission.email.toLowerCase().trim(),
        dob: submission.dob,
        address: submission.address,
        story: submission.story,
        location: submission.location,
        raw_image_url: submission.raw_image_url,
        edited_image_url: submission.edited_image_url,
        submission_status: 'submitted',
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Database insertion failed: ${error.message}`);
  }

  return data;
}
