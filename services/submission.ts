import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { pool } from '../lib/db';
import { SubmissionData } from '../types';

/**
 * Saves an uploaded file buffer directly to the Hostinger server filesystem.
 * Returns the absolute system file path (for rollbacks) and the public asset URL.
 */
export async function uploadFileToStorage(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  folder: 'raw-images' | 'edited-images'
): Promise<{ filePath: string; publicUrl: string }> {
  // Compute absolute path where files will be stored inside the public directory
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
  
  // Ensure the target upload directory exists on the disk
  await fs.mkdir(uploadDir, { recursive: true });

  // Generate unique filename using UUID to prevent collisions
  const uniqueId = crypto.randomUUID();
  const fileExt = fileName.split('.').pop() || 'png';
  const cleanName = fileName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const finalFileName = `${uniqueId}_${cleanName}.${fileExt}`;
  
  const fullFilePath = path.join(uploadDir, finalFileName);
  
  // Save buffer to Hostinger filesystem
  await fs.writeFile(fullFilePath, fileBuffer);

  // Return local file path (for unlinking during rollback) and public root-relative URL path
  const publicUrl = `/uploads/${folder}/${finalFileName}`;

  return {
    filePath: fullFilePath,
    publicUrl,
  };
}

/**
 * Deletes a file from the server filesystem (used for transaction rollbacks).
 */
export async function deleteFileFromStorage(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
    console.log(`Rollback Success: Deleted local file ${filePath} from server.`);
  } catch (error: any) {
    console.error(`Rollback Error: Failed to delete local file ${filePath}:`, error.message);
  }
}

/**
 * Checks if a submission already exists with the same email or mobile number in MySQL.
 */
export async function checkDuplicateSubmission(
  email: string,
  mobileNumber: string
): Promise<{ isDuplicate: boolean; reason?: string }> {
  const query = `
    SELECT email, mobile_number 
    FROM photography_contest_submissions 
    WHERE LOWER(email) = ? OR mobile_number = ? 
    LIMIT 1
  `;
  
  const [rows] = await pool.query(query, [
    email.toLowerCase().trim(),
    mobileNumber.trim()
  ]);

  const results = rows as any[];

  if (results.length > 0) {
    const matched = results[0];
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
 * Inserts a new submission record into the MySQL database.
 */
export async function insertSubmission(
  submission: SubmissionData
): Promise<SubmissionData> {
  const uniqueId = crypto.randomUUID();
  const emailClean = submission.email.toLowerCase().trim();
  const status = 'submitted';

  const query = `
    INSERT INTO photography_contest_submissions (
      id, 
      full_name, 
      mobile_number, 
      email, 
      dob, 
      address, 
      story, 
      location, 
      raw_image_url, 
      edited_image_url, 
      submission_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await pool.query(query, [
    uniqueId,
    submission.full_name,
    submission.mobile_number,
    emailClean,
    submission.dob,
    submission.address,
    submission.story,
    submission.location,
    submission.raw_image_url,
    submission.edited_image_url,
    status
  ]);

  return {
    id: uniqueId,
    full_name: submission.full_name,
    mobile_number: submission.mobile_number,
    email: emailClean,
    dob: submission.dob,
    address: submission.address,
    story: submission.story,
    location: submission.location,
    raw_image_url: submission.raw_image_url,
    edited_image_url: submission.edited_image_url,
    submission_status: status,
  };
}

/**
 * Retrieves all submissions from the MySQL database, ordered by created_at DESC.
 */
export async function getAllSubmissions(): Promise<SubmissionData[]> {
  const query = `
    SELECT 
      id, 
      full_name, 
      mobile_number, 
      email, 
      DATE_FORMAT(dob, '%Y-%m-%d') as dob, 
      address, 
      story, 
      location, 
      raw_image_url, 
      edited_image_url, 
      submission_status, 
      created_at, 
      updated_at
    FROM photography_contest_submissions
    ORDER BY created_at DESC
  `;
  const [rows] = await pool.query(query);
  return rows as SubmissionData[];
}

/**
 * Updates the status of a submission in the MySQL database.
 */
export async function updateSubmissionStatus(
  id: string,
  status: 'submitted' | 'approved' | 'rejected'
): Promise<void> {
  const query = `
    UPDATE photography_contest_submissions
    SET submission_status = ?
    WHERE id = ?
  `;
  await pool.query(query, [status, id]);
}

