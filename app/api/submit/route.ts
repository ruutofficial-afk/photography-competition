import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  checkDuplicateSubmission,
  uploadFileToStorage,
  deleteFileFromStorage,
  insertSubmission,
} from '../../../services/submission';

// Zod Schema for input validation
const submissionValidationSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters.'),
  mobileNumber: z.string().regex(/^\d{10,}$/, 'Mobile number must contain only numbers and be at least 10 digits.'),
  email: z.string().email('Please enter a valid email address.'),
  dob: z.string().refine((dobString) => {
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return false;
    
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 13;
  }, 'You must be at least 13 years old to participate.'),
  story: z.string()
    .min(50, 'Story must be at least 50 characters.')
    .max(1000, 'Story cannot exceed 1000 characters.'),
  location: z.string().min(1, 'Location is required.'),
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  let uploadedRawPath = '';
  let uploadedEditedPath = '';

  try {
    const formData = await req.formData();
    
    // 1. Extract values
    const fullName = formData.get('fullName')?.toString() || '';
    const mobileNumber = formData.get('mobileNumber')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const dob = formData.get('dob')?.toString() || '';
    const story = formData.get('story')?.toString() || '';
    const location = formData.get('location')?.toString() || '';
    
    const rawFile = formData.get('rawImage') as File | null;
    const editedFile = formData.get('editedImage') as File | null;

    // 2. Validate input fields using Zod
    const validationResult = submissionValidationSchema.safeParse({
      fullName,
      mobileNumber,
      email,
      dob,
      story,
      location,
    });

    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues.map(err => err.message).join(' ');
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    // 3. Validate image files
    if (!rawFile || rawFile.size === 0) {
      return NextResponse.json({ success: false, error: 'Raw Image is required.' }, { status: 400 });
    }
    if (!editedFile || editedFile.size === 0) {
      return NextResponse.json({ success: false, error: 'Edited Photo is required.' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(rawFile.type)) {
      return NextResponse.json({ success: false, error: 'Raw image must be a JPG, JPEG, PNG, or WEBP file.' }, { status: 400 });
    }
    if (!ALLOWED_MIME_TYPES.includes(editedFile.type)) {
      return NextResponse.json({ success: false, error: 'Edited photo must be a JPG, JPEG, PNG, or WEBP file.' }, { status: 400 });
    }

    if (rawFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'Raw image must be smaller than 10MB.' }, { status: 400 });
    }
    if (editedFile.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'Edited photo must be smaller than 10MB.' }, { status: 400 });
    }

    // 4. Duplicate Check
    const duplicateCheck = await checkDuplicateSubmission(email, mobileNumber);
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json({ success: false, error: duplicateCheck.reason || 'You have already submitted an entry.' }, { status: 409 });
    }

    // 5. Convert files to ArrayBuffers -> Buffers
    const rawBuffer = Buffer.from(await rawFile.arrayBuffer());
    const editedBuffer = Buffer.from(await editedFile.arrayBuffer());

    // 6. Upload Raw Image
    const rawUploadResult = await uploadFileToStorage(
      rawBuffer,
      rawFile.name,
      rawFile.type,
      'raw-images'
    );
    uploadedRawPath = rawUploadResult.filePath;

    // 7. Upload Edited Image
    const editedUploadResult = await uploadFileToStorage(
      editedBuffer,
      editedFile.name,
      editedFile.type,
      'edited-images'
    );
    uploadedEditedPath = editedUploadResult.filePath;

    // 8. Insert record in DB
    const submissionData = await insertSubmission({
      full_name: fullName,
      mobile_number: mobileNumber,
      email,
      dob,
      story,
      location,
      raw_image_url: rawUploadResult.publicUrl,
      edited_image_url: editedUploadResult.publicUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'Submission successful!',
      submissionId: submissionData.id,
    });

  } catch (error: any) {
    console.error('Error processing submission:', error);

    // Rollback: delete uploaded files if database insert or any other process failed
    if (uploadedRawPath) {
      await deleteFileFromStorage(uploadedRawPath);
    }
    if (uploadedEditedPath) {
      await deleteFileFromStorage(uploadedEditedPath);
    }

    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected error occurred during submission. Please try again.' },
      { status: 500 }
    );
  }
}
